require('dotenv').config();
require('./cron/remainder');
const path = require('path');
const express =require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
const sequelize = require('./util/database');
const compression = require('compression');
const helmet = require('helmet');
app.use(cors({
    origin:"*"
}));
//updated finally
app.use(bodyParser.json({extended:false}));
app.use(express.urlencoded({ extended: true }));
const User = require('./models/user');
const userroutes = require('./routes/user');
const Application = require('./models/applications');
const applicationsRoutes = require('./routes/application');
const Companies = require('./models/company');
const companyRoutes = require('./routes/company');
const remainder = require('./models/remainder');
const remainderRoutes = require('./routes/remainder');



User.hasMany(Application, { foreignKey: 'user_id' });
Application.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Companies);
Companies.belongsTo(User);
User.hasMany(remainder);
remainder.belongsTo(User);



// Add the Cross-Origin-Opener-Policy (COOP) header middleware
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});

// Optional: Add Content-Security-Policy header for form action as fallback
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;");
  next();
});


app.use(compression());
app.use(helmet());

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/user',userroutes);
app.use('/job',applicationsRoutes);
app.use('/job',companyRoutes);
app.use('/job',remainderRoutes);


app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;");
  next();
});
app.use((req,res)=>{
  console.log(req.url);
  res.sendFile(path.join(__dirname,`public/${req.url}`))
})




sequelize.sync()
  .then((result) => {
  
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port 3000'+process.env.PORT);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

