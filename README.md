# Readable (Project)

This is a Udacity ReactJS Nanodegree project simulating a rudimentary blog where the user can add, modify and delete posts and comments. The project incorporates Redux for state management. Requirements for this project are contained in the [ReadableReq pdf](https://github.com/josephcozad/readable/blob/master/ReadableReq.pdf).

## Install

Clone the repo at: `https://github.com/josephcozad/readable.git`

Install and start the server.
```
cd readable/server
npm install
node start
```

Install and start the client.
```
cd readable/client
npm install
npm start
```

## Usage

Navigate your browser to `http://localhost:3000/`

An initial display is a summary of postings with two default postings under a navbar. Navbar allows you to "add" a new posting, or "sort" postings by various options. On this main page each posting summary includes the title of the posting, the author and date it was created, and a maximum of two lines from the posting itself. You can delete the posting, vote up or down the posting, and edit the posting from it's summary. You can also see the number of comments the posting has.

On the right side of the main page is a list of available categories. Clicking on a category will display a summary of postings for that category. The main page displays all postings regardless of category. When navigating between categories, the navbar will show which category of postings are displayed, and also allows you to navigate back to the main summary page of all postings by clicking on the "Readable" title in the navbar.

Clicking on the posting title will display the posting detail, the full posting with any associated 
comments. From this detail page you can delete the posting, comment on the posting, vote up or down the posting, and edit the posting. Each comment can be edited, voted on or deleted from the posting detail page. Deleting a posting will delete all the comments associated with that posting. Note that the default posting titled "Udacity is the best place to learn React" comes with two default comments.

Restarting the server will clear all modifications to the application and reset to the defaults.

Posting images are dynamically associated with a posting when created based on the submitted title. Images are courtesy of `http://picsum.photos`.

Author images are dynamically associated with a posting or comment when created based on the submitted authors full name. Images are courtesy of `https://randomuser.me`.

## Release Notes

2018-05-19 (0.1.000):

* Initial release.
