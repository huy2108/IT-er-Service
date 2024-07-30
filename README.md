**HOW TO RUN THE WEBSITE**
_FRONT END:_
    cd front-end \n
  	npm install
  	npm start  
   
_BACK END:_
    cd back-end
  	npm install
  	touch .env
  	nano .env
  	Then paste this line of code: JWT_SECRET="anhlequanghuydeptrainhathanhtinhdonha"
  	Saving file by following these step:
  		Ctrl + X --> Y --> Enter
    npm start
    
_ADMIN:_
    cd admin
  	npm install
  	npm run dev
   
_DATABASE:_
    Download 5 JSON files (5 Collections) in my database folder above
    In MongoDB Compass, ensure to create a new database named: ITer_WebService
    Create 5 new collections with the names: books, users, postforums, commentforums, commentaries
    For 'books' collection: import the file ITer_WebService.books.json (in the 'database' folder above)
    For 'users' collection: import the file ITer_WebService.users.json (in the 'database' folder above)
    For 'postforums' collection: import the file ITer_WebService.postforums.json (in the 'database' folder above)
    For 'commentaries' collection: import the file ITer_WebService.commentaries.json (in the 'database' folder above)
    For 'commentforums' collection: import the file ITer_WebService.commentforums.json (in the 'database' folder above)

    *NOTICE: Keep the precise names like above
    
