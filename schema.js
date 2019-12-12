const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull, GraphQLID, GraphQLList } = graphql;
const booksModel = require("./mongoose/booksModel");
const authorModel = require("./mongoose/authorModel")

// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', bookId: 1 },
//     { name: 'The Final Empire', genre: 'Fantasy', bookId: 2 },
//     { name: 'The Long Earth', genre: 'Sci-Fi', bookId: 3 },
// ];

// var author = [
//     { name: 'syed', id: '1' },
//     { name: 'maaz', id: '2' },
//     { name: 'hasan', id: '3' },
// ];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        bookId: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: new GraphQLList(Author),
            async resolve(parent, args) {
                // code to get data from db / other source
                console.log(parent)
                const result = await authorModel.find({ authorId: parent.bookId });
                // console.log(result);
                // console.log("req came");
                return result;
            }
        }
    })
});

//just your query structure
// {
//     book(id: "2"){
//              name,
//              id,
//              genre
//     }

// }

const Author = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        authorId: { type: GraphQLString },
        name: { type: GraphQLString },
        book: {
            type: new GraphQLList(BookType),

            async resolve(parent, args) {
                // code to get data from db / other source
                console.log(parent)
                const result = await booksModel.find({ bookId: parent.authorId });
                // console.log(result);
                // console.log("req came");
                return result;
            }
        }


    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: new GraphQLList(BookType),
            args: { bookId: { type: GraphQLID } },
            async resolve(parent, args) {
                // code to get data from db / other source
                const result = await booksModel.find({ bookId: args.bookId });
                // console.log(result);
                // console.log("req came");
                return result;
            }
        },
        author: {
            type: new GraphQLList(Author),
            args: { authorId: { type: GraphQLID } },
            async resolve(parent, args) {
                const result = await authorModel.find({ authorId: args.authorId });
                // console.log(result);
                // console.log("req came");
                return result;

            }
        },
        allBooks: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                // code to get data from db / other source
                const result = await booksModel.find();
                // console.log(result);
                // console.log("req came");
                return result;
            }
        },
        allAuthors: {
            type: new GraphQLList(Author),
            async resolve(parent, args) {
                const result = await authorModel.find();
                // console.log(result);
                // console.log("req came");
                return result;

            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                bookId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                console.log(args)
                const data = new booksModel({
                    name: args.name,
                    genre: args.genre,
                    bookId: args.bookId
                });
                return data.save();
            }
        },
        updateAuthor: {
            type: Author,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                console.log(args)
                const data = new authorModel({
                    name: args.name,
                    authorId: args.authorId
                });
                return data.save();
            }
        }
    }


})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
