
const User = require("../models/User");
const bcrypt = require('bcrypt')

// CREATE USER
exports.createUser = async (req, res) => {

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        telegram: req.body.telegram,
        wallet: req.body.wallet,
        isAdmin: true
    });

    try {

      if( !( req.body.email.includes("@gmail") ||  
             req.body.email.includes("@hotmail") || 
             req.body.email.includes("@yahoo") ||
             req.body.email.includes("@outlook") ) ){

        return res.status(401).json("Please provide a valid email")

      }
        const oldEmail = await User.findOne({email: req.body.email})

        if(oldEmail) return res.status(401).json("A user is registered with this email")

        await newUser.save();

        return res.status(201).json("Registration Complete");

    } catch (error) {
        console.log(error)
        return res.status(400).json("An error occured while trying to creat account")
    }
}

// LOGIN USER
exports.loginUser = async (req, res) => {

    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json("An account is not registered with this email");

        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if(!validPassword) return res.status(404).json("Incorrect password");

        // hides password from client
        const { password, ...others} = user._doc;

        return res.status(200).json({...others});

    } catch (error) {
        return res.status(400).json("Oops! An error occured")
    }

}

// GET ALL USERS
exports.getAllUsers = async (req, res) => {

    try {

        let query = User.find();
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * pageSize;
        const total = await User.countDocuments();
        const pages = Math.ceil( total / pageSize );
        query = query.skip(skip).limit(pageSize);
        const results = await query;

        if(page > pages) {
            return res.status(404).json('page not found');
        };

        return res.status(200).json({
            count: results.length,
            page,
            pages,
            data: results
        });

    } catch (err) {
       return res.status(401).json(err);
    }
}

// SEARCH USERS
exports.searchUser = async (req, res) => {
    
    const { user } = req.query;

    try {
        // FIND IN EMAILS
        const filteredEmail = await User.find( { email: {
                $regex: `${user}`,
                $options: 'i'
            }} )

        return res.status(200).json(filteredEmail);

    } catch (err) {
        return res.status(400).json(err);
    }
}

// GET NO OF USERS
exports.getNoUsers = async (req, res) => {

    try {

        const total = await User.countDocuments()
     
        return res.status(200).json(total)

    } catch (err) {

       return res.status(401).json(err);

    }

}

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
    
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        
        if(!user._doc.isAdmin) return res.status(401).json("Unauthorized");

        // compares password
        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword) return res.status(404).json("Incorrect password");

        return res.status(200).json({
            id: user._id,
            email: user.email
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json("Oops! An error occured")
    }

}


exports.getAllEmails = async (req, res) => {

    try {

        const totalEmail = []

        let query = User.find();
        const page = parseInt(req.query.page) || 9
        const pageSize = parseInt(req.query.limit) || 1000
        const skip = (page - 1) * pageSize
        const total = await User.countDocuments()
        const pages = Math.ceil( total / pageSize )
        query = query.skip(skip).limit(pageSize)
        const allUsers = await query
         
        for(u of allUsers){

            // const refs = await User.countDocuments({referrer: u.userid})
            // console.log((refs * 5000))

            totalEmail.push(
                {
                    BSC: u.bsc,
                    Emails: u.email,
                    Airdrop: u.airdropAmount,
                    Referral: u.refAmount,
                    Total: u.amount
                }
            ) 
        }
       
        return res.status(200).json({
            count: allUsers.length,
            page,
            pages,
            data: totalEmail
        })
        
    } catch (error) {
        return res.status(400).json('An error occured')
    }

}