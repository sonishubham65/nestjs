# Nest Js Boilerplate

## Developer Setup

### Installation

You must be using Node 14 or higher (Recommended. May run with older versions.)

```bash
npm install -g yarn
npm install
npm run start:dev
```

## Config module

Config module is used to get the configuration values from yaml file.
You can define the config files in `config` folder as config/local.yaml (for local env)

This boilerplate uses base base module that contains setting module along with setting service.
Setting service can be used to get the values from yaml files.

### config/local.yaml

```Yaml
databases:
  postgres:
    url: postgres://postgres:Pass%40123@localhost:5432/postgres
    migration: true
```

### settingService in Controller/Service

```Typescript
constructor(
    private settingService: SettingService,
  ) {
      console.log(this.settingService.db.host()); // localhost
  }
```

## Cache controller

Add these two lines with controller function. Parameter for CacheKey should be unique for every controller function within application.

```Typescript
@CacheKey('contact-us-details')
@CacheTTL(60) //Cache for 60 Seconds
contact_us_details(){
    this.staticService.contactUsDetails();
}
```

### Set, get and del cache, Customize option

```Typescript
// Set and Get cache from service function
@CacheTTL(30)  //Cache for 30 Seconds
async findAll(userId) {
    let roles: string = await this.cacheManager.get(`roles-${userId}`);
    if (!roles) {
        roles = await this.roleEntityRepositry.find({
        where: { user: userId },
        });
        this.cacheManager.set(`roles-${userId}`, roles);
    } else {
        roles = roles;
    }

    return roles;
}
// delete the roles from Cache manager
await this.cacheManager.del(`roles-${userId}`);
```

## Logger decorator

Logger can be used to log every request incoming and delivered respose in stackdriver.

```Typescript
async property(@Param() param, @Logger() logger) {
    return await this.propertyService.findOne(param.id);
  }
```

## Role based Authentication

```Typescript
@Put('/:id')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.User, Role.Admin)
@HttpCode(HttpStatus.ACCEPTED)
async update(@Body() body, @Param() param, @Request() req, @Logger() logger) {
    // This function will execute only for the user having Admin or User role access.
}
```

## CSAL Authentication

```Typescript
const ability = this.caslProperty.createForUser(req.user);
const property = await this.propertyService.findOne(param.id);
if (ability.can(Action.Update, property)) {
    // Can perform action
}
```

## Request Transformer Middelware

As if we send the query params in object format, it does not transformed by dto for nested level.
So we need to transform it before sending to DTO.

```Typescript
export function TransfromerMiddleware(req, res, next) {
  if (req.query.where) req.query.where = JSON.parse(req.query.where);
  if (req.query.order) req.query.order = JSON.parse(req.query.order);
  next();
}

// Main.ts
app.use(TransfromerMiddleware);

```

## File upload

```Typescript
bucket;
constructor(){
    const storage = new Storage();
    this.bucket = storage.bucket(this.bucketName);
}

@UseInterceptors(FileInterceptor('cover'))
async cover(
@UploadedFile() image: Express.Multer.File,
) {
    // Upload to GCS
    const url = await new Promise((resolve, reject) => {
      try {
        const folderName = 'properties/cover';
        const filePath = `${folderName}/${uuid()}-${image.originalname}`;

        // Create a new blob in the bucket and upload the file data.
        const blob = this.bucket.file(filePath);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
          reject(err);
        });

        blobStream.on('finish', async () => {
          try {
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
            resolve(publicUrl);
          } catch (e) {
            reject(e);
          }
        });

        blobStream.end(image.buffer);
      } catch (e) {
        reject(e);
      }
    });
    return await this.propertyService.update(param.id, {
      cover: url,
    });
}
```

## Some prebuild decorators for data validation

- IsValidString
- IsStrongPassword
- IsValidDate

```Typescript
@IsValidString()
@IsStrongPassword()
@IsValidDate('YYYY-MM-DDTHH:mm:ssZ')
```

## Key Points to remember

- Package.json should have TZ=UTC variable.
- true parameter should be in moment function when validating the date.
- Date should be with timezone. If it is coming from client end then the format should be in `YYYY-MM-DDTHH:mm:ssZ`

Date validation with Moment

```Typescript
return moment(value, format, true).isValid();
```

Get timezone and offset

```Typescript
moment.tz.guess(); // Moment.Js
moment().format('Z');
```

## Stay in touch

- Author - [Shubham Soni](mailto:shubham.soni@mtxb2b.com)
