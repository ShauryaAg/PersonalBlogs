# Personal Blogs

> > NOTE: Custom install command to make this work: `rm -rf node_modules/ && npm cache clean --force && npm rebuild --verbose sharp && rm package-lock.json && npm install`

#### Blogs By ShauryaAg

Just add the Blog Markdown file in `src/pages/` and everything should be set.

##### Blogs Frontmatter:

Frontmatter accepts the following fields:

```js
{
  path: String
  title: String
  author: String
  date: String of format (YYYY-MM-DD)
  featured: Boolean
  featuredImage: String (path to the image)
}
```

### Converting Medium Blogs to Markdown

Use the `medium-to-markdown` script to generate the markdown version of the blogs

##### Usage:

`node medium-to-markdown <medium-url> > /path/to/file.md`
