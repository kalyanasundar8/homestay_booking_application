# homestay_booking_application

## Tools used
1. VS Code for writing code
2. Postman for api checking

## Dependencies
npm i bcryptjs colors dotenv express express-async-handler jsonwebtoken mongoose nodemon

## Code run command
1. npm run server

## Queries
1. Create => User.create({})
2. find => User.findById, findOne
3. $nin => Notin
4. $or => check this or that
5. $gte => Greater than or equal to
6. $lte => less than or equal to

## Routes
1. Create user => POST/api/users/register_user
2. Login user => POST/api/login/login_user
3. logout => POST/api/logout/logout_user
4. Create homestays => POST/api/homestay/create_homestays
5. Get homestays => GET/api/homestay/homestays_avail
6. Create booking => POST/api/booking/booking-home

## Outputs

![Register_user](assets/registeruser.png)
**1.Register user**

![Login_user](assets/login.png)
**2.Login user**

![Create_homestays](assets/createhomes.png)
**3.Create Homes**

![Get_homestays](assets/gethomes.png)
**4.Get Homes**

![Booking_homes](assets/bookhomes.png)
**5.Booking homes**

![DB_Booking](assets/booking.png)
**6.Db for storing users booking details**

![postman_folder](assets/folder.png)

**Postman folder Image**

![Logout_user](assets/logout.png)
**Logut user**

## DB Images

![DB_folder](assets/dbfolder.png)

**DB Folder structure**

![users_DB](assets/users.png)
**Users DB image**

![homestays_img](assets/homestays.png)
**Homestays DB image**

