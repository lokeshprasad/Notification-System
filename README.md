## Synopsis

Firstly before starting any project I usually used to go through its every possible application flow that I think can possible.

After going through the application flow I decided that in this project there are two major constraints i.e publishers and subscribers.

Both publisher and subscribers can be characterised means they can be of different types.
But some of there properties remains same whatever type they have.

Means publisher can publish or broadcast messages and subscribers have listens for the messages.

When functionality comes into consideration I think I have to give a real time updates to the subscribers so I used capped collection of mongodb with tailable cursor functionality.

I think tis is the best way for project.

## Installation

1. A server platform either linux or windows or other which is supported.
2. Mongo DB Database.
3. Node.js
4. IDE
5. mongodb client (available at npm)
6. socket.io (available at npm)

## References

1. http://stackoverflow.com/
2. https://coderwall.com/p/c8cr1q/tailable-cursors-in-mongodb

## Prerequisites
Create a capped collection in mongo.
eg. db.createCollection('notifications', {capped: true, size: 100000}).
