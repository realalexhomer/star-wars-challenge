# star-wars-challenge
Javascript challenge for ADP, please look at the live plunker here: plnkr.co/XrbxEG/

The challenge / requirements are available here: https://gist.github.com/BearAlliance/c69161ea705a2c4f6f8a

Update January 26 2018:

This was more or less state of the art 2 years ago when the spec for es2015 had just been finalized and babel / webpack were becoming mainstream production tools. However, now there are problems with the style its written in. Its also written in React 0.14 which is before a bunch of breaking changes so the API looks a little different.

For one I should be using the `import` / `export` api rather than global variables! I think the reason they are global here is that plunker didn't support `import` back then?

I'm also using `let` in a bunch of places I should be using `const`.

These days I would also write tests first, even for this, just to document what I'm doing and make debugging easier in the long run.

I still think its a decent example that I understand:

- How the promise API works
- How to modularize code
- How to write css

I am in the process of creating a new portfolio website, and am going to be creating a scaffold for a modern JS site soon.

The code for the new blog is here: https://github.com/realalexhomer/personal_site
