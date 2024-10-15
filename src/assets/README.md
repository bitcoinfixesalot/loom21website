<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Loom21 Docs</h3>

  <p align="center">
    Track and manage your inventory, invoices, customers, vendors, payments and more.
    <br />
    <a href="https://github.com/loom21/loom21doc" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/loom21/loom21doc/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/loom21/loom21doc/issues" target="_blank">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#create-account">Create Account</a></li>
        <li><a href="#sign-in">Sign In</a></li>
      </ul>
    </li>
    <li>
      <a href="#settings">Settings</a>
      <ul>
        <li><a href="#general-settings">General settings</a></li>
        <li><a href="#btcpay-server">BTCPay Server</a></li>
        <li><a href="#stripe">Stripe</a></li>
        <li><a href="#product-categories">Product Categories</a></li>
        <li><a href="#measures">Measures</a></li>
        <li><a href="#import-templates">Import Templates</a></li>
      </ul>
    </li>
    <li>
      <a href="#sales">Sales</a>
      <ul>
        <li><a href="#add-edit-sales">Add/Edit Sales</a></li>
        <li><a href="#payments">Payments</a></li>
      </ul>
    </li>
    <li><a href="#accounts">Accounts</a></li>
    <li><a href="#products-services">Products and Services</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started<a id="getting-started"></a>

In order to start using the loom21 app you need to create an account.

### Create Account
After you sign up you will receive a confirmation email to confirm you account.
![Sign Up to app.loom21.com](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sign-up-light.PNG)
<!-- 
### Sign In <a id="sign-in"></a>

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ``` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Settings

Setting up your organization.

### General settings <a id="general-settings"></a>
- On this page, you can update your default store, language, currency, VAT settings, toggle Bitcoin prices on or off, and switch between light and dark mode.
- You can also set your address, which will appear on invoices.

![General Settings Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/general-setting-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### BTCPay Server<a id="btcpay-server"></a>
- To enable Bitcoin payments, you must configure your BTCPay Server URL and API Key.

![BTCPay Server Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/btcpay-server-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Stripe<a id="stripe"></a>
- To accept fiat payments via Stripe, you need to configure your Stripe Publishable and Secret keys.

![Stripe Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/stripe-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Product Categories <a id="product-categories"></a>
- Organize your products into categories for easier browsing and improved management.

![Product Categories Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-categories-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Measures
- Define measurement units for your products or services.

![Measures Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/measures-light.PNG)  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Import Templates<a id="import-templates"></a>
- If you already have a list of products, services, customers, or suppliers, you can import them directly into the system.

![Import Templates Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/import-templates-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Sales<a id="sales"></a>
You can create a new Sale by pressing the button "New Order" 
or edit existing one by clicking on the purple arrow.
![Sales list](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sales-list-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Add/Edit Sales <a id="add-edit-sales"></a>
- On the right side of the page, you can enter your order information, and optionally select the store from which you are dispatching (not applicable for services). This selection will be factored into your inventory calculations.
- You can add products or services individually, or search and multi-select by clicking on "Select Items."
- When selecting a customer, their address will automatically populate, but you can modify it if necessary.

![Add new sale order](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sale-add-new-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Payments <a id="payments"></a>
- Once your order is saved, payment and share buttons will appear, allowing you to either complete the payment directly or generate and send payment links to your customer.

![Saved sale order](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sale-order-saved-light.PNG)

- Payments can be made using your local currency or Bitcoin.
- You can also generate and share or print documents such as quotes, invoices, receipts, or pickup lists.

![Pay with bitcoin](https://raw.githubusercontent.com/loom21/loom21doc/main/images/pay-with-bitcoin-light.PNG)
> :bell: All features within the application are protected by authentication, except for the links generated through the share button.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Accounts <a id="accounts"></a>
- You can invite an unlimited number of users to your organization as needed.

![Invite account](https://raw.githubusercontent.com/loom21/loom21doc/main/images/account-invite-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Products and Services <a id="products-services"></a>
On this page, you can efficiently manage your products
- Easily find products by name, category, or specific measurements.
- Seamlessly import product lists from external sources.
- Add new products or update existing ones with just a click. Simply press the button to create new or the purple arrow icon to modify product details.

![Products list](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-list-light.PNG)

On the next picture you can see the product details. The following fields and options are available:
- Product Name: Set or update the full name of the product.
- Abbreviation: Define a short form or acronym for easier reference.
- Category: Assign the product to a relevant category for better organization.
- Measure: Specify the unit of measurement (e.g., liters, kilograms).
- Code & Note: Add unique product codes or internal notes.
- Barcode & QR Code: Generate and manage barcodes and QR codes for the product.
- Price Calculation: Convert prices between your local currency and Bitcoin, and vice versa.

![Product edit](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-edit-light.PNG)

#### Services Management

Services are managed in a similar way to products. You can create, edit, and categorize services just like products. However, services differ in that they are not included in inventory calculations, as they don't affect stock levels or require physical tracking.



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Inventory <a id="inventory"></a>
View and update your product inventory per store.

![Inventory](https://raw.githubusercontent.com/loom21/loom21doc/main/images/inventory-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Stores <a id="store"></a>
- Add or edit stores.

![Stores](https://raw.githubusercontent.com/loom21/loom21doc/main/images/stores-light.PNG)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Suppliers <a id="suppliers"></a>
- View all your vendors, or add and edit new ones.

## Deliveries <a id="deliveries"></a>
## Customers <a id="customers"></a>


<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/github_username/repo_name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
