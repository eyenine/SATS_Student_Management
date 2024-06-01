const mysql=require('mysql');
//Connection pool
const pool=mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//Tesst Purpose

exports.test=(req,res)=>{
    res.render('index',{layout: false});
}


//again Test
exports.login=(req,res)=>{
    res.render('login',{layout:false});
}


//View Users
exports.view=(req,res)=>{




    //Connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    //User the connection
    connection.query('SELECT *FROM Student',(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('home',{rows});
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});




}

//Find student by search
exports.find=(req,res)=>{

    
    //Connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    let searchTerm=req.body.search;

    //User the connection
    connection.query('SELECT *FROM Student WHERE Name LIKE ? OR HALL LIKE ?  OR id LIKE ? OR BATCH LIKE ? OR Dept LIKE ?', ['%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('home',{rows});
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});

}




exports.form=(req,res)=>{
    res.render('add-user');
}




//Add new Profile
exports.create=(req,res)=>{

    const {id,Name,Phone,Email,Hall,Batch,Dept}=req.body;

pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    let searchTerm=req.body.search;

    //User the connection
    connection.query('INSERT INTO Student SET id= ?,Name = ?,Phone = ?,Email = ?,Hall = ?,Batch = ?, Dept = ?',[id,Name,Phone,Email,Hall,Batch,Dept],(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('add-user',{alert:'Student Added Successfully 😊😊'});
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});
}


//Edit Profile
exports.edit=(req,res)=>{
  
        //Connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    //User the connection
    connection.query('SELECT *FROM Student where id = ?',[req.params.id],(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('edit-user',{rows});
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});


}


//Update Profile
exports.update=(req,res)=>{
  
    const {id,Name,Phone,Email,Hall,Batch,Dept}=req.body;   
    //Connect to DB
pool.getConnection((err,connection)=>{
if(err) throw err;
console.log('Connection as ID'+connection.threadId);


//User the connection
connection.query('UPDATE Student SET id = ?,Name = ?,Phone = ?,Email = ?,Hall = ?,Batch = ?,Dept = ? WHERE id = ?',[id,Name,Phone,Email,Hall,Batch,Dept,req.params.id],(err,rows)=>{
    //when done with the connection,release it

    connection.release();

    if(!err){
      
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('Connection as ID'+connection.threadId);
        
        
            //User the connection
            connection.query('SELECT *FROM Student where id = ?',[req.params.id],(err,rows)=>{
                //when done with the connection,release it
        
                connection.release();
        
                if(!err){
                    res.render('edit-user',{alert:'Successfully Updated Hurrah!😁'});
                }
                else {
                    console.log(err);
                }
        
               console.log('The data from the table:\n',rows);
        
            });
        
        
        });

    }
    else {
        console.log(err);
    }

   console.log('The data from the table:\n',rows);

});


});


}


//Delete Profile
exports.delete=(req,res)=>{
  
    //Connect to DB
pool.getConnection((err,connection)=>{
if(err) throw err;
console.log('Connection as ID'+connection.threadId);


//User the connection
connection.query('DELETE FROM Student where id = ?',[req.params.id],(err,rows)=>{
    //when done with the connection,release it

    connection.release();

    if(!err){
        res.redirect('/home');
    }
    else {
        console.log(err);
    }

   console.log('The data from the table:\n',rows);

});


});


}


//View Profile

exports.viewall=(req,res)=>{

   //Connect to DB
   pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    //User the connection
    connection.query('SELECT *FROM Student WHERE id = ?',[req.params.id],(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('view-user',{ rows });
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});

}


//Tracking section



//open the page
exports.trackaccess=(req,res)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connection as ID'+connection.threadId);
    
    
        //User the connection
        connection.query('SELECT *FROM ActivityTrack',(err,rows)=>{
            //when done with the connection,release it
    
            connection.release();
    
            if(!err){
                res.render('tracking',{ rows });
            }
            else {
                console.log(err);
            }
    
           console.log('The data from the table:\n',rows);
    
        });
    
    
    });
}


//Add new Activity
exports.enter=(req,res)=>{
    res.render('newActivity');
}

//new Acitvity insert

exports.insert=(req,res)=>{

    
    const {ID,Date,Activity,Points} = req.body;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connection as ID'+connection.threadId);
    
    
        let searchTerm=req.body.search;
    
        //User the connection
        connection.query('INSERT INTO ActivityTrack SET ID= ?,Date = ?,Activity = ?,Points = ?',[ID,Date,Activity,Points],(err,rows)=>{
            //when done with the connection,release it
    
            connection.release();
    
            if(!err){
                res.render('newActivity',{alert:'Activity Added Successfully 😊😊😁'});
            }
            else {
                console.log(err);
            }
    
           console.log('The data from the table:\n',rows);
    
        });
    
    
    });

}


//check activity list
exports.check=(req,res)=>{


     //Connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connection as ID'+connection.threadId);


    let searchTerm=req.body.InsertRoll;

    //User the connection
    connection.query('SELECT Name,Date,Activity,Points,Dept FROM ActivityTrack INNER JOIN Student ON ActivityTrack.ID=Student.id WHERE ActivityTrack.ID = ?', [searchTerm],(err,rows)=>{
        //when done with the connection,release it

        connection.release();

        if(!err){
            res.render('tracklist',{rows});
        }
        else {
            console.log(err);
        }

       console.log('The data from the table:\n',rows);

    });


});
}
