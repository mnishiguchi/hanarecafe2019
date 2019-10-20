# hanarecafe

## Get started

#### Install gems

```
bundle install
```

#### run the app in development

start webpack dev server and jekyll dev server

```
foreman start -f Procfile.dev
```

view localhost:4000

#### build the app in production

```
node_modules/.bin/webpack --mode production && JEKYLL_ENV=production jekyll build
```

## Thanks
- [jekyll](https://github.com/jekyll/jekyll)
- [bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [stylish-portfolio](https://startbootstrap.com/template-overviews/stylish-portfolio/)
- [single div timeline](https://codepen.io/NielsVoogt/pen/MbMMxv)
- [untra/polyglot](https://github.com/untra/polyglot)
- [penibelst/jekyll-compress-html](https://github.com/penibelst/jekyll-compress-html)
- [How to Use ES6 and Webpack With Jekyll](https://michaelmovsesov.com/articles/jekyll-es6-workflow)
- [webpack](https://webpack.js.org/)
- [survivejs](https://survivejs.com/webpack)
- [icomoon.io](https://icomoon.io/#docs/inline-svg)
- https://www.netlify.com/
- etc
