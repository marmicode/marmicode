/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
}

export interface Query {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  author?: Maybe<Author>;
  authorCollection?: Maybe<AuthorCollection>;
  resource?: Maybe<Resource>;
  resourceCollection?: Maybe<ResourceCollection>;
  textBlock?: Maybe<TextBlock>;
  textBlockCollection?: Maybe<TextBlockCollection>;
  blogPost?: Maybe<BlogPost>;
  blogPostCollection?: Maybe<BlogPostCollection>;
  codeBlock?: Maybe<CodeBlock>;
  codeBlockCollection?: Maybe<CodeBlockCollection>;
  frame?: Maybe<Frame>;
  frameCollection?: Maybe<FrameCollection>;
  recipe?: Maybe<Recipe>;
  recipeCollection?: Maybe<RecipeCollection>;
  topic?: Maybe<Topic>;
  topicCollection?: Maybe<TopicCollection>;
  skill?: Maybe<Skill>;
  skillCollection?: Maybe<SkillCollection>;
}

export interface QueryAssetArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryAssetCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
}

export interface QueryAuthorArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryAuthorCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AuthorFilter>;
  order?: Maybe<Array<Maybe<AuthorOrder>>>;
}

export interface QueryResourceArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ResourceFilter>;
  order?: Maybe<Array<Maybe<ResourceOrder>>>;
}

export interface QueryTextBlockArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryTextBlockCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TextBlockFilter>;
  order?: Maybe<Array<Maybe<TextBlockOrder>>>;
}

export interface QueryBlogPostArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryBlogPostCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<BlogPostFilter>;
  order?: Maybe<Array<Maybe<BlogPostOrder>>>;
}

export interface QueryCodeBlockArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryCodeBlockCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CodeBlockFilter>;
  order?: Maybe<Array<Maybe<CodeBlockOrder>>>;
}

export interface QueryFrameArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryFrameCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FrameFilter>;
  order?: Maybe<Array<Maybe<FrameOrder>>>;
}

export interface QueryRecipeArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryRecipeCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<RecipeFilter>;
  order?: Maybe<Array<Maybe<RecipeOrder>>>;
}

export interface QueryTopicArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QueryTopicCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TopicFilter>;
  order?: Maybe<Array<Maybe<TopicOrder>>>;
}

export interface QuerySkillArgs {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface QuerySkillCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<SkillFilter>;
  order?: Maybe<Array<Maybe<SkillOrder>>>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface Asset {
  __typename?: 'Asset';
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetUrlArgs {
  transform?: Maybe<ImageTransformOptions>;
}

/** Represents a binary file in a space. An asset can be any file type. */
export interface AssetLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

export interface Sys {
  __typename?: 'Sys';
  id: Scalars['String'];
  spaceId: Scalars['String'];
  environmentId: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
}

export interface ImageTransformOptions {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
}

export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
}

export interface AssetLinkingCollections {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  authorCollection?: Maybe<AuthorCollection>;
  resourceCollection?: Maybe<ResourceCollection>;
}

export interface AssetLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface AssetLinkingCollectionsAuthorCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface AssetLinkingCollectionsResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface EntryCollection {
  __typename?: 'EntryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
}

export interface Entry {
  sys: Sys;
}

export interface AuthorCollection {
  __typename?: 'AuthorCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Author>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/author) */
export interface Author extends Entry {
  __typename?: 'Author';
  sys: Sys;
  linkedFrom?: Maybe<AuthorLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Asset>;
  twitter?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/author) */
export interface AuthorLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/author) */
export interface AuthorNameArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/author) */
export interface AuthorPictureArgs {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/author) */
export interface AuthorTwitterArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface AuthorLinkingCollections {
  __typename?: 'AuthorLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  resourceCollection?: Maybe<ResourceCollection>;
}

export interface AuthorLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface AuthorLinkingCollectionsResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface ResourceCollection {
  __typename?: 'ResourceCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Resource>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface Resource extends Entry {
  __typename?: 'Resource';
  sys: Sys;
  linkedFrom?: Maybe<ResourceLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  duration?: Maybe<Scalars['Int']>;
  isWip?: Maybe<Scalars['Boolean']>;
  picture?: Maybe<Asset>;
  releasedAt?: Maybe<Scalars['DateTime']>;
  requiredSkillCollection?: Maybe<ResourceRequiredSkillCollection>;
  skillCollection?: Maybe<ResourceSkillCollection>;
  summary?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  content?: Maybe<ResourceContent>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceSlugArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceResourceTypeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceAuthorArgs {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceDurationArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceIsWipArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourcePictureArgs {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceReleasedAtArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceRequiredSkillCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceSkillCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceSummaryArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceUrlArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/resource) */
export interface ResourceContentArgs {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface ResourceLinkingCollections {
  __typename?: 'ResourceLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
}

export interface ResourceLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface ResourceRequiredSkillCollection {
  __typename?: 'ResourceRequiredSkillCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Skill>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/skill) */
export interface Skill extends Entry {
  __typename?: 'Skill';
  sys: Sys;
  linkedFrom?: Maybe<SkillLinkingCollections>;
  label?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  topic?: Maybe<Topic>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/skill) */
export interface SkillLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/skill) */
export interface SkillLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/skill) */
export interface SkillSlugArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/skill) */
export interface SkillTopicArgs {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface SkillLinkingCollections {
  __typename?: 'SkillLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  resourceCollection?: Maybe<ResourceCollection>;
}

export interface SkillLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface SkillLinkingCollectionsResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/topic) */
export interface Topic extends Entry {
  __typename?: 'Topic';
  sys: Sys;
  linkedFrom?: Maybe<TopicLinkingCollections>;
  label?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/topic) */
export interface TopicLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/topic) */
export interface TopicLabelArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/topic) */
export interface TopicSlugArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TopicLinkingCollections {
  __typename?: 'TopicLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  skillCollection?: Maybe<SkillCollection>;
}

export interface TopicLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface TopicLinkingCollectionsSkillCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface SkillCollection {
  __typename?: 'SkillCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Skill>>;
}

export interface ResourceSkillCollection {
  __typename?: 'ResourceSkillCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Skill>>;
}

export type ResourceContent = BlogPost | Recipe;

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/blogPost) */
export interface BlogPost extends Entry {
  __typename?: 'BlogPost';
  sys: Sys;
  linkedFrom?: Maybe<BlogPostLinkingCollections>;
  text?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/blogPost) */
export interface BlogPostLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/blogPost) */
export interface BlogPostTextArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface BlogPostLinkingCollections {
  __typename?: 'BlogPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  resourceCollection?: Maybe<ResourceCollection>;
}

export interface BlogPostLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface BlogPostLinkingCollectionsResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/recipe) */
export interface Recipe extends Entry {
  __typename?: 'Recipe';
  sys: Sys;
  linkedFrom?: Maybe<RecipeLinkingCollections>;
  frameCollection?: Maybe<RecipeFrameCollection>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/recipe) */
export interface RecipeLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/recipe) */
export interface RecipeFrameCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface RecipeLinkingCollections {
  __typename?: 'RecipeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  resourceCollection?: Maybe<ResourceCollection>;
}

export interface RecipeLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface RecipeLinkingCollectionsResourceCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface RecipeFrameCollection {
  __typename?: 'RecipeFrameCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Frame>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface Frame extends Entry {
  __typename?: 'Frame';
  sys: Sys;
  linkedFrom?: Maybe<FrameLinkingCollections>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  blockCollection?: Maybe<FrameBlockCollection>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface FrameLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface FrameTitleArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface FrameSlugArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface FrameDurationArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/frame) */
export interface FrameBlockCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface FrameLinkingCollections {
  __typename?: 'FrameLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  recipeCollection?: Maybe<RecipeCollection>;
}

export interface FrameLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface FrameLinkingCollectionsRecipeCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface RecipeCollection {
  __typename?: 'RecipeCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Recipe>>;
}

export interface FrameBlockCollection {
  __typename?: 'FrameBlockCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<FrameBlockItem>>;
}

export type FrameBlockItem = CodeBlock | TextBlock;

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/codeBlock) */
export interface CodeBlock extends Entry {
  __typename?: 'CodeBlock';
  sys: Sys;
  linkedFrom?: Maybe<CodeBlockLinkingCollections>;
  code?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/codeBlock) */
export interface CodeBlockLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/codeBlock) */
export interface CodeBlockCodeArgs {
  locale?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/codeBlock) */
export interface CodeBlockLanguageArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface CodeBlockLinkingCollections {
  __typename?: 'CodeBlockLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  frameCollection?: Maybe<FrameCollection>;
}

export interface CodeBlockLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface CodeBlockLinkingCollectionsFrameCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface FrameCollection {
  __typename?: 'FrameCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Frame>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/textBlock) */
export interface TextBlock extends Entry {
  __typename?: 'TextBlock';
  sys: Sys;
  linkedFrom?: Maybe<TextBlockLinkingCollections>;
  text?: Maybe<Scalars['String']>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/textBlock) */
export interface TextBlockLinkedFromArgs {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** [See type definition](https://app.contentful.com/spaces/gowvxq3b4aid/content_types/textBlock) */
export interface TextBlockTextArgs {
  locale?: Maybe<Scalars['String']>;
}

export interface TextBlockLinkingCollections {
  __typename?: 'TextBlockLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  frameCollection?: Maybe<FrameCollection>;
}

export interface TextBlockLinkingCollectionsEntryCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface TextBlockLinkingCollectionsFrameCollectionArgs {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
}

export interface AssetFilter {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Scalars['String']>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName?: Maybe<Scalars['String']>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
}

export interface SysFilter {
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['String']>;
  publishedAt_not?: Maybe<Scalars['String']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt_contains?: Maybe<Scalars['String']>;
  publishedAt_not_contains?: Maybe<Scalars['String']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  firstPublishedAt_not?: Maybe<Scalars['String']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  firstPublishedAt_contains?: Maybe<Scalars['String']>;
  firstPublishedAt_not_contains?: Maybe<Scalars['String']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion?: Maybe<Scalars['String']>;
  publishedVersion_not?: Maybe<Scalars['String']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedVersion_contains?: Maybe<Scalars['String']>;
  publishedVersion_not_contains?: Maybe<Scalars['String']>;
}

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface AssetCollection {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
}

export interface AuthorFilter {
  sys?: Maybe<SysFilter>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  picture_exists?: Maybe<Scalars['Boolean']>;
  twitter_exists?: Maybe<Scalars['Boolean']>;
  twitter?: Maybe<Scalars['String']>;
  twitter_not?: Maybe<Scalars['String']>;
  twitter_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter_contains?: Maybe<Scalars['String']>;
  twitter_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<AuthorFilter>>>;
  AND?: Maybe<Array<Maybe<AuthorFilter>>>;
}

export enum AuthorOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TwitterAsc = 'twitter_ASC',
  TwitterDesc = 'twitter_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface ResourceFilter {
  author?: Maybe<CfAuthorNestedFilter>;
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  resourceType_exists?: Maybe<Scalars['Boolean']>;
  resourceType?: Maybe<Scalars['String']>;
  resourceType_not?: Maybe<Scalars['String']>;
  resourceType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  resourceType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  resourceType_contains?: Maybe<Scalars['String']>;
  resourceType_not_contains?: Maybe<Scalars['String']>;
  author_exists?: Maybe<Scalars['Boolean']>;
  duration_exists?: Maybe<Scalars['Boolean']>;
  duration?: Maybe<Scalars['Int']>;
  duration_not?: Maybe<Scalars['Int']>;
  duration_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  duration_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  duration_gt?: Maybe<Scalars['Int']>;
  duration_gte?: Maybe<Scalars['Int']>;
  duration_lt?: Maybe<Scalars['Int']>;
  duration_lte?: Maybe<Scalars['Int']>;
  isWip_exists?: Maybe<Scalars['Boolean']>;
  isWip?: Maybe<Scalars['Boolean']>;
  isWip_not?: Maybe<Scalars['Boolean']>;
  picture_exists?: Maybe<Scalars['Boolean']>;
  releasedAt_exists?: Maybe<Scalars['Boolean']>;
  releasedAt?: Maybe<Scalars['DateTime']>;
  releasedAt_not?: Maybe<Scalars['DateTime']>;
  releasedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  releasedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  releasedAt_gt?: Maybe<Scalars['DateTime']>;
  releasedAt_gte?: Maybe<Scalars['DateTime']>;
  releasedAt_lt?: Maybe<Scalars['DateTime']>;
  releasedAt_lte?: Maybe<Scalars['DateTime']>;
  requiredSkillCollection_exists?: Maybe<Scalars['Boolean']>;
  skillCollection_exists?: Maybe<Scalars['Boolean']>;
  summary_exists?: Maybe<Scalars['Boolean']>;
  summary?: Maybe<Scalars['String']>;
  summary_not?: Maybe<Scalars['String']>;
  summary_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary_contains?: Maybe<Scalars['String']>;
  summary_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  content_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<ResourceFilter>>>;
  AND?: Maybe<Array<Maybe<ResourceFilter>>>;
}

export interface CfAuthorNestedFilter {
  sys?: Maybe<SysFilter>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  picture_exists?: Maybe<Scalars['Boolean']>;
  twitter_exists?: Maybe<Scalars['Boolean']>;
  twitter?: Maybe<Scalars['String']>;
  twitter_not?: Maybe<Scalars['String']>;
  twitter_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  twitter_contains?: Maybe<Scalars['String']>;
  twitter_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfAuthorNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfAuthorNestedFilter>>>;
}

export enum ResourceOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  ResourceTypeAsc = 'resourceType_ASC',
  ResourceTypeDesc = 'resourceType_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  IsWipAsc = 'isWip_ASC',
  IsWipDesc = 'isWip_DESC',
  ReleasedAtAsc = 'releasedAt_ASC',
  ReleasedAtDesc = 'releasedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface TextBlockFilter {
  sys?: Maybe<SysFilter>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_not?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_contains?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<TextBlockFilter>>>;
  AND?: Maybe<Array<Maybe<TextBlockFilter>>>;
}

export enum TextBlockOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface TextBlockCollection {
  __typename?: 'TextBlockCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<TextBlock>>;
}

export interface BlogPostFilter {
  sys?: Maybe<SysFilter>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_not?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_contains?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<BlogPostFilter>>>;
  AND?: Maybe<Array<Maybe<BlogPostFilter>>>;
}

export enum BlogPostOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface BlogPostCollection {
  __typename?: 'BlogPostCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<BlogPost>>;
}

export interface CodeBlockFilter {
  sys?: Maybe<SysFilter>;
  code_exists?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  code_not?: Maybe<Scalars['String']>;
  code_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  code_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  code_contains?: Maybe<Scalars['String']>;
  code_not_contains?: Maybe<Scalars['String']>;
  language_exists?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  language_not?: Maybe<Scalars['String']>;
  language_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  language_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  language_contains?: Maybe<Scalars['String']>;
  language_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CodeBlockFilter>>>;
  AND?: Maybe<Array<Maybe<CodeBlockFilter>>>;
}

export enum CodeBlockOrder {
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface CodeBlockCollection {
  __typename?: 'CodeBlockCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<CodeBlock>>;
}

export interface FrameFilter {
  sys?: Maybe<SysFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  duration_exists?: Maybe<Scalars['Boolean']>;
  duration?: Maybe<Scalars['Int']>;
  duration_not?: Maybe<Scalars['Int']>;
  duration_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  duration_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  duration_gt?: Maybe<Scalars['Int']>;
  duration_gte?: Maybe<Scalars['Int']>;
  duration_lt?: Maybe<Scalars['Int']>;
  duration_lte?: Maybe<Scalars['Int']>;
  blockCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<FrameFilter>>>;
  AND?: Maybe<Array<Maybe<FrameFilter>>>;
}

export enum FrameOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface RecipeFilter {
  sys?: Maybe<SysFilter>;
  frameCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<RecipeFilter>>>;
  AND?: Maybe<Array<Maybe<RecipeFilter>>>;
}

export enum RecipeOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface TopicFilter {
  sys?: Maybe<SysFilter>;
  label_exists?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<TopicFilter>>>;
  AND?: Maybe<Array<Maybe<TopicFilter>>>;
}

export enum TopicOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export interface TopicCollection {
  __typename?: 'TopicCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Topic>>;
}

export interface SkillFilter {
  topic?: Maybe<CfTopicNestedFilter>;
  sys?: Maybe<SysFilter>;
  label_exists?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  topic_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<SkillFilter>>>;
  AND?: Maybe<Array<Maybe<SkillFilter>>>;
}

export interface CfTopicNestedFilter {
  sys?: Maybe<SysFilter>;
  label_exists?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  slug_exists?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  slug_not?: Maybe<Scalars['String']>;
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  slug_contains?: Maybe<Scalars['String']>;
  slug_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfTopicNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfTopicNestedFilter>>>;
}

export enum SkillOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}
