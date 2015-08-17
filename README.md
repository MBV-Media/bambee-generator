# generator-bambee
A generator for [Yeoman](http://yeoman.io/) to customize the [Bambee WordPress Theme](https://github.com/MBV-Media/Bambee-WordPress-Theme).

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Install the generator

```
$ npm install -g generator-bambee
```

### How to use it

**Install Bambee WordPress theme the first time:**
```
# Go to the wp-content directory of your WordPress
cd wp-content
# Run the generator
$ yo bambee
```

**Load dependencies (execute installation commands) of an existing Bambee WordPress theme:**
```
# Go to the wp-content directory of your WordPress
cd wp-content
# RUn the generator sub-command
yo bambee:loadDependencies
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)