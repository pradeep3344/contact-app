//Driver Code


const User = require("./user");

try {
    const admin1 = User.newAdmin("pradeep", "pradeep123")

    
    // Admin CRUD Operations

    const user1 = admin1.newUser("raju", "raju123")
    const user2 = admin1.newUser("Rakesh", "r123")
    const user3 = admin1.newUser("Dev", "dk123")
    


    admin1.updateUser("raju123", "name", "Raju")
    admin1.deleteUser("dk123")
//---------------------Contact And Contact Info Crud ------------------------------------------------------

      user1.newContact("pradeep");
      user1.newContact("nik");
      user1.newContact("sam");

      user1.updateContact("nik","bruno");
      user1.deleteContact("sam");

      

      user1.getContact("pradeep").addContactInfo("Home",9090);
      user1.getContact("pradeep").addContactInfo("Mobile",9090);
      user1.getContact("pradeep").addContactInfo("Work",9090);

      
      user1.getContact("pradeep").updateContactInfo("Work",1010);
      user1.getContact("pradeep").deleteContactInfo("Work");


      console.log(user1);
      console.log(user1.getContact("pradeep").getAllContactInfos());
      user1.getContact("pradeep").deleteAllConatctInfo();
   




} catch (error) {
    console.log(error.message)
}


