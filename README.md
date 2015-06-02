
## Overview

**DISCLAIMER: THIS IS SAMPLE CODE AND NOT PRODUCTION QUALITY CODE!**

Before running this sample, the BookService sample needs to be running locally
on your computer or published to the cloud.  For more information, see
[BookService](https://github.com/appcelerator-developer-relations/BookService).

This sample is a client application that makes HTTP requests to the BookService
project.  You can view, create, edit and delete books stored in a Mongo backend
database via the BookService.

This sample runs on either Android 4.0 (API 14) and later, or iOS 7 and later;
and was tested against Appcelerator CLI 4.0, Appcelerator Studio 4.0 and Titanium SDK 4.0.0.GA.

## Importing the Project into Studio

Clone this repo, create a new Alloy project, then import the cloned repo into
the newly created Alloy project.

  1. From the menu bar, select **File > New > Mobile Project**. The **New Mobile
     Project** wizard appears.
  2. Select **Alloy > Default Alloy Project**.  Click **Next**.
  3. Fill out all fields and click **Finish**.
  4. From the menu bar, select **File > Import**. The **Import** wizard appears.
  5. Select **General > File System**. Click **Next**.
  6. For **From directory**, click **Browse**, navigate to the cloned repo, then click **Open**.
  7. Select the **app** folder, that is, checkmark the item.
  8. For **Into directory**, click **Browse**, select the newly created project, then click **OK**.
  9. Click **Finish**.

Studio creates a new Alloy project and imports the files into it.

### Configure the REST Sync Adapter

Modify the `app/model/book.js` file:

  1. Change the `config.adapter.base_url` key to the endpoint URL
     of the BookService, for example, `http://192.168.0.1:8080/api/book/`.
  2. Change the `config.adapter.api_key` key to the API key of the application. The value should
     match one of the `apikey` values in the Arrow configuration file.
  3. Change the `config.adapter.auth_type` key to match the value of the `APIKeyAuthType` in the
     Arrow configuration file.

**NOTE:** When running the BookService project locally, you cannot use `localhost` or `127.0.0.1` in
the value of the `base_url` key.

## Running the Client Application

Before running the client application, the BookService project either needs
to be running locally on your computer or published to the cloud.

In Studio,

  1. Select your project in the **App Explorer** or **Project Explorer** view.
  2. Click the **Run** button and select either the **Android Emulator** or
     **iPhone Simulator**.
     
Studio launches the client application on the selected platform.

## Testing the Client Application

The client application uses the native controls of the Android and iOS platform
to add a book or refresh the table.

  * For Android, in the action bar, select `Add` to add a book or `Refresh` to refresh the view.
  * For iOS, use the window's right navigation button (`Add`) to add a book
    and drag the table down to refresh the view.

To close a window, use the **Back** button on the Android platform and the
window's left navigation button on the iOS platform.

To modify or delete a book, click on the book title in the table, then:

  * To modify the book, make your modifications and click **Save Edits**.
  * To delete the book, click **Remove**.
