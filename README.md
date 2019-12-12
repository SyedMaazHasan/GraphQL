# GraphQL
full crud operations using graphQL (connected to mongo DB)

# mutation {
#   updateBook(name: "Name of the Wind", genre: "Fantasy", bookId: 1) {
#     name
#   }
# }

# mutation {
#   updateBook(name: "The Final Empire", genre: "Fantasy", bookId: 2) {
#     name
#   }
# }

# mutation {
#   updateBook(name: "The Long Earth", genre: "Fantasy", bookId: 5) {
#     name
#   }
# }

{book(bookId:1){
  bookId
  name
  author{
    name
  }
}}


# {author(authorId:1){
#   name
#   book{
#     name
#   }

# }}

# mutation{
#   updateAuthor(name:"syed",authorId:1){
#     name
#   }
# }

# mutation{
#   updateAuthor(name:"maaz",authorId:2){
#     name
#   }
# }


# mutation{
#   updateAuthor(name:"hasan",authorId:3){
#     name
#   }
# }

# {allBooks{
#   name
# }}

# {allAuthors{
#   name
# }}
