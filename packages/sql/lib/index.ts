const sqliteParser = require('sqlite-parser')

 const ast = sqliteParser(`select * from 'user'`);
 const asta = sqliteParser(`select a.id,a.username,b.group_title from 'user' a,'user_group' b`);
 const uast = sqliteParser(`update user set username = "u1" where id = 1`);

 debugger;