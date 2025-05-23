# TppLibRefresh

This library was originally generated with Angular CLI version 8 and has been updated to [Angular CLI](https://github.com/angular/angular-cli) version 19.

## Installation

You can install this library directly from GitHub:

```bash
npm install github:dpingoztpp/tpp-lib-refresh
```

Or add it to your package.json:

```json
"dependencies": {
  "tpp-lib-refresh": "github:dpingoztpp/tpp-lib-refresh"
}
```

## Features

- Automatic JWT token refresh on 401 responses
- Token storage handling
- Request interception for authenticated calls

## Code scaffolding

Run `ng generate component component-name --project tpp-lib-refresh` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project tpp-lib-refresh`.
> Note: Don't forget to add `--project tpp-lib-refresh` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build tpp-lib-refresh` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build tpp-lib-refresh --configuration=production`, go to the dist folder `cd dist/tpp-lib-refresh` and run `npm publish`.

## Usage

```typescript
// Import in your app.module.ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TppLibRefreshModule, TppLibRefreshService } from 'tpp-lib-refresh';

@NgModule({
  imports: [
    // ... other imports
    HttpClientModule,
    TppLibRefreshModule.forRoot({
      url: 'https://your-api-url.com/api'
    })
  ],
  providers: [
    // Register the interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TppLibRefreshService, multi: true }
  ]
})
export class AppModule { }
```

## Running unit tests

Run `ng test tpp-lib-refresh` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
