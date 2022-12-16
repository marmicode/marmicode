import { createBlogPost } from './blog-post';
import { BlogPostComponent, BlogPostModule } from './blog-post.component';

describe(BlogPostComponent.name, () => {
  it('should show blog', () => {
    cy.mount(BlogPostComponent, {
      imports: [BlogPostModule],
      componentProperties: {
        blogPost: createBlogPost({
          id: '123',
          author: {
            name: 'Younes Jaaidi',
            pictureUri:
              'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
            twitter: 'yjaaidi',
          },
          duration: 6,
          pictureUri:
            'https://images.ctfassets.net/gowvxq3b4aid/7IC9BlKufXjqRWb5ISDS9h/95e4e3730e896a24e5f41b12e72fc832/end-to-end-http-request-cancelation-with-rxjs-and-nestjs.jpg',
          releasedAt: new Date(2021, 0, 0),
          summary: 'Life is too short...',
          title: 'End-to-End HTTP request cancelation with RxJS & NestJS',
          text: `
Life is too short. When searching for something, we can’t afford to type a whole word or sentence in a search field, or filling all the fields then hitting our old keyboard’s half-broken enter key to finally be able to see the first results... or nothing at all because our search criteria were too restrictive.

Don’t look at me like that! We can probably agree that most of us, if not all, are **used to features like typeahead and live search results**. We get frustrated every time we have to submit a search form.

# TL;DR:
- if you are using [NestJS](https://nestjs.com/), **you will need this interceptor**,
- if you are not using [NestJS](https://nestjs.com/) then **maybe you should**,
- we have to **think reactively**, I agree that it can have a steep learning curve but think about the pleasure of sliding on the other side of the hill ⛷,
- we can and should use **[RxJS](https://rxjs-dev.firebaseapp.com/) everywhere**,
- we should **use observables even for single value streams**,
- we should **not ignore observables teardown logic**.

# Long Long Long Long Long Heading 1

## Long Long Long Long Long Heading 2

### Long Long Long Long Long Heading 3

# 🚨 Reactive Programming & RxJS to the rescue

Implementing these kinds of features can be tricky, especially if developed from scratch and with an imperative approach. That’s when reactive programming and RxJS come to the rescue. In fact, RxJS provides the right tooling and operators to implement these features in a few lines.
RxJS is such a perfect fit for these scenarios that most courses and tutorials cover the live search topic. It helps understand both how reactive programming works and how it can easily solve some challenging issues.

That’s when we end up with this common recipe:

\`\`\`javascript
keywords$ = this.keywordsControl.valueChanges;
data$ = keywords$.pipe(
  ...
)
\`\`\`

The illustration below might help you notice the difference between [RxJS flattening strategies](https://slides.com/yjaaidi/rxjs-flattening-strategy) and the related operators:

![RxJS Flattening Strategies](https://dev-to-uploads.s3.amazonaws.com/i/iiw632jrlizoo33rhm4d.png)

but if it doesn't help, you should definitely check out the great work by my buddy Shai Reznik: https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b

# 🐢 Hey Debounce! Stop bullying my low latency!

The problem is that you are probably investing a lot of energy and money in producing low latency architectures and APIs but all these **efforts just vanish when we introduce the artificial latency created by the [\`debounceTime\`](https://rxjs-dev.firebaseapp.com/api/operators/debounceTime) operator.**

What if we just get rid of the debounce? We are using [\`switchMap\`](https://rxjs-dev.firebaseapp.com/api/operators/switchMap) after all, and unnecessary requests are immediately canceled.

![Request cancelation](https://dev-to-uploads.s3.amazonaws.com/i/zafrrtqydgh10qkir5ra.gif)

Wait a second! What happens on the back-end? Is the back-end "work" interrupted by some voodoo magic? Or **did we just trigger some crazy chaos** where the back-end is working for nothing until it realizes that the consumer is not there anymore?

# 🐈 Here comes the big cat 

In a few words, NestJS is **THE feature-rich NodeJS framework**.

Amongst its wealth of features, there is **native support of observables**. This is quite handy even if we respond with a single value and not a stream of values. In fact, **the interesting observables property we are looking for here is cancelability**.

# 🧨 Observables Teardown Logic

Observables are said **cancelable** because we can unsubscribe whenever we need to, and interrupt the work. Cancelation works thanks to the teardown logic **function returned when creating an observable**.

Here’s an example of wrapping \`setInterval\` in an observable:

\`\`\`javascript
function interval(period) {
  return new Observable(observer => {
    ...
  });
}
\`\`\`

As you can see, the observer function given to the \`Observable\`'s constructor returns the **teardown logic function that calls \`clearInterval\`** in order to cancel the tasks scheduled by \`setInterval\`.

⚠️ **This is exactly how you should NOT implement an interval.**
This implementation is [scheduler](https://rxjs-dev.firebaseapp.com/guide/scheduler) naive.
You should use [\`interval\`](https://rxjs-dev.firebaseapp.com/api/index/function/interval) or [\`timer\`](https://rxjs-dev.firebaseapp.com/api/index/function/timer) instead.

# 🧪 The experiment
For the experiment, I needed to run some slow CPU, filesystem and memory intensive work on the back-end for every request. The first idea that crossed my mind was reading a big text file line by line and matching every one of them against the given keywords.
It turned out that even with a 1GB file, it was still quite fast.

That’s when I thought that **reading multiple small files should be more inefficient**. I just needed to generate a directory with lots of files... but wait! **What about using \`node_modules\` directory** 🤔

Bingo! It could not be worse and that is exactly what I needed.

The implementation looks something like this and as you can see, the **teardown logic immediately stops crawling** the directory and reading files **when the observer unsubscribes**.

\`\`\`javascript
function getFiles(directoryPath) {
  return new Observable(observer => {
    ...
    return () => walker.pause();
  }
}

function readLines(filePath) {
  return new Observable(observer => {
    ...
    return () => reader.close();
  }
}

function search(): Observable<Line[]> {
  return getFiles(nodeModulesPath)
    .pipe(
      mergeMap(file => readLines(file)),
      ...
    );
}
\`\`\`

# 😔 The disappointment


In the animation below, we can observe high CPU usage and an exponential memory usage on the back-end and that **canceling the requests, even the last one, doesn’t interrupt the work**.

![CPU & Memory Usage](https://dev-to-uploads.s3.amazonaws.com/i/55gms8nbi5puw5atuscn.gif)

By diving a little bit in [Nest’s source code](https://github.com/nestjs/nest/blob/8755571094524f28e2792472cac4cc0171b29e1b/packages/core/router/router-response-controller.ts#L49:L54), we can see that our observable is converted to a promise using \`toPromise\` method. In fact, Nest has to adapt to frameworks like ExpressJS that don’t handle observables.

\`\`\`javascript
public async transformToResult(resultOrDeferred: any) {
  ...
}
\`\`\`

# 🔍 Detecting request cancelation
In Nest, request objects are instances of NodeJS’ [\`IncomingMessage\`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that **trigger a \`close\` event when the connection is closed or when the HTTP2 stream is closed**.

If we can detect when the request is canceled, then we can interrupt the work in our RxJS response stream.

* \`aborted\` vs \`close \`:
\`IncomingMessage\` also triggers an \`aborted\` event that you can ignore as it will probably be deprecated in the future.
Cf. https://github.com/nodejs/node/issues/15456 & https://github.com/nodejs/node/issues/15525.

Nest has an interesting concept called **interceptors**:

- *Interceptors have a set of useful capabilities which are inspired by the [Aspect Oriented Programming (AOP)](https://en.wikipedia.org/wiki/Aspect-oriented_programming) technique.*

and it looks like this:

\`\`\`javascript
@Injectable()
export class NoopInterceptor implements NestInterceptor {
  ...
}
\`\`\`

This makes it possible to write, **in a single place**, a function that:
1. **intercepts** every incoming HTTP request,
2. **listens** to the request’s \`close\` event,
3. does something to **interrupt** the work.

One of the interesting properties of Nest interceptors, compared to Express middlewares for example, is that the \`next\` parameter is not just a function that triggers the route function or the next middleware but **it is an object with a \`handle\` method that returns an \`Observable\`**.

Thanks to this feature, **we can manipulate the response and the whole stream by adding operators to the given \`Observable\`**.

For instance, we can detect the request cancelation by listening to the \`close\` event using RxJS's [\`fromEvent\`](https://rxjs-dev.firebaseapp.com/api/index/function/fromEvent) and interrupt the \`Observable\` returned by the route handler using the [\`takeUntil\`](https://rxjs-dev.firebaseapp.com/api/operators/takeUntil) operator.

The final interceptor should look like this:

\`\`\`javascript
@Injectable()
export class UnsubscribeOnCloseInterceptor implements NestInterceptor {
  ...
}
\`\`\`

Let's try it out!

![CPU & memory usage with interceptor](https://dev-to-uploads.s3.amazonaws.com/i/c60e6qkvdxuxekmht1ed.gif)

As you can observe, thanks to the interceptor, **canceling an HTTP request will automatically and almost immediately cancel the work by unsubscribing from the observable returned by the route handler**.
This reduces CPU, memory and all resources usage and interrupts all the work even when the user simply closes the window.

# 🧠 Think reactive

The key takeaway here is that **by adopting a reactive approach and using observables everywhere, we can easily benefit from observables cancelability and boost APIs performance** with a generic interceptor.


# MongoDB query cancelation

What if our data source was a database like MongoDB? Can we interrupt the query?
📻 Stay tuned for an upcoming post on this topic 😉

# 👨🏻‍🍳 Let me help you!

At [Marmicode](https://marmicode.io), we use our passion and experience in Web Development & eXtreme Programming to help you cook better apps, ship them fast and make you proud of your work.

We have the services you need:
- Code Review,
- Remote Consultations,
- Workshops,
- On-demand development *billed by accepted points*.

📨 kitchen at marmicode.io

> Some quoted content
>
> Blablabla


# 🔗 Links
💻 [Source code](https://github.com/yjaaidi/ng-experiments/tree/http-request-cancelation) Nx monorepo with an Angular app, a NestJS API and custom CPU / Memory graphing app using Angular & GraphQL subscriptions.
🐦 [@yjaaidi](https://twitter.com/intent/follow?screen_name=yjaaidi) Stay tuned for more posts and upcoming workshops.
        `,
        }),
      },
    });
    cy.snapshot();
  });

  it('should show video', () => {
    cy.mount(BlogPostComponent, {
      imports: [BlogPostModule],
      componentProperties: {
        blogPost: createBlogPost({
          id: '123',
          author: {
            name: 'Younes Jaaidi',
            pictureUri:
              'https://images.ctfassets.net/gowvxq3b4aid/222xakOb6LBZWV0vPP2vjm/b4b75f0113a2b4c0b4029bef4926d88c/younes-marmicode-1024.jpeg',
            twitter: 'yjaaidi',
          },
          duration: 6,
          pictureUri: null,
          releasedAt: new Date(2021, 0, 0),
          summary: 'Life is too short...',
          title: 'End-to-End HTTP request cancelation with RxJS & NestJS',
          text: `
# This is a video
![JSCutlery Cypress Mount](//videos.ctfassets.net/gowvxq3b4aid/3AGudY8hGMwRmFvZ1xzJvi/3ba2ba62c5109c2537246d82787821b2/jscutlery-cypress-mount.mp4)
    `,
        }),
      },
    });

    /* Wait for video tag to appear before taking a snapshot. */
    cy.get('video').should('be.visible');

    cy.snapshot();
  });
});
