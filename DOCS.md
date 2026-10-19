<a id="docs-top"></a>

<h3 align="center">Loom21 Docs</h3>

  <p align="center">
    Track and manage your inventory, invoices, customers, vendors, payments and more.
    <br />
    <a href="https://github.com/loom21/loom21doc" target="_blank"><strong>Explore the docs »</strong></a>
    <br />
    <br />
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
    <li><a href="#dashboard">Dashboard</a></li>
    <li><a href="#payment-links">Payment Links</a></li>
    <li>
      <a href="#sales">Sales</a>
      <ul>
        <li><a href="#add-edit-sales">Add/Edit Sales</a></li>
        <li><a href="#payments">Payments</a></li>
        <li><a href="#invoice-numbers">Invoice Numbers and PDFs</a></li>
        <li><a href="#credit-notes">Credit Notes</a></li>
        <li><a href="#annul-invoice">Annulling an Invoice</a></li>
        <li><a href="#overpayments">Overpayments and Refunds</a></li>
        <li><a href="#import-invoices">Moving From Another Program (Import Invoices)</a></li>
        <li><a href="#country-rules">Invoicing Rules and Your Country</a></li>
      </ul>
    </li>
    <li>
      <a href="#reports">Reports</a>
      <ul>
        <li><a href="#sales-report">Sales Report</a></li>
        <li><a href="#deliveries-report">Deliveries Report</a></li>
        <li><a href="#vat-ledger">VAT Sales Ledger</a></li>
      </ul>
    </li>
    <li>
      <a href="#settings">Settings</a>
      <ul>
        <li><a href="#general-settings">General Settings</a></li>
        <li><a href="#subscription">Subscription</a></li>
        <li><a href="#stripe">Stripe</a></li>
        <li><a href="#btcpay-server">BTCPay Server</a></li>
        <li><a href="#lightning-wallet">Lightning Wallet (Glow)</a></li>
        <li><a href="#speed-wallet">Speed Wallet</a></li>
        <li><a href="#lnbits">LNBits</a></li>
        <li><a href="#product-settings">Product Settings</a></li>
        <li><a href="#product-categories">Product Categories</a></li>
        <li><a href="#measures">Measures</a></li>
        <li><a href="#brands">Brands &amp; Models</a></li>
        <li><a href="#custom-fields">Custom Fields</a></li>
        <li><a href="#price-lists">Price Lists</a></li>
        <li><a href="#import-templates">Import and Export (Excel and CSV)</a></li>
      </ul>
    </li>
    <li><a href="#accounts">Accounts</a></li>
    <li><a href="#products-services">Products and Services</a></li>
    <li><a href="#inventory">Inventory</a></li>
    <li><a href="#stores">Stores</a></li>
    <li><a href="#deliveries">Delivery Orders</a></li>
    <li><a href="#customers-suppliers">Customers and Suppliers</a></li>
    <li><a href="#user-profile">User Profile</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started<a id="getting-started"></a>

In order to start using the loom21 app you need to create an account. Here is the recommended setup flow:

1. **Create an account** and confirm your email.
2. Configure **[General Settings](#general-settings)** — set your language, currency, VAT, and address.
3. Configure at least one **[payment processor](#settings)** (Stripe, BTCPay Server, etc.) so it appears at checkout.
4. Add your **[Products and Services](#products-services)**.
5. Create your first **[Sale](#sales)**.

### Create Account<a id="create-account"></a><a id="sign-in"></a>
After you sign up you will receive a confirmation email to confirm your account and then you can sign in.
![Sign Up to app.loom21.com](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sign-up-and-in-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

<!-- DASHBOARD -->
## Dashboard<a id="dashboard"></a>

The Dashboard is the first page you see after signing in. It gives you an at-a-glance overview of your business performance for the selected time period.

**Key features:**

- **Period selector** — Choose from the last 30 days or any of the previous 6 calendar months to compare your performance over time.
- **KPI cards** — At the top you will find summary cards showing:
  - Total fiat revenue (card and bank payments)
  - Total Bitcoin revenue (in satoshis)
  - Number of paid invoices, broken down by payment method (Bitcoin vs. fiat)
  - Delivery orders completed and those still pending confirmation
  - Paid payment links, broken down by payment method
  - Trend indicators (up/down arrows) so you can quickly see whether your numbers are improving.
- **How revenue is counted** — revenue is the money actually received, on the day it was paid, not on the day of the sale. A sale from May paid in October counts as October revenue; it is still counted as a May sale in the invoice counts. Credit notes and recorded refunds are taken off, so the figure is net. An invoice that was never paid adds nothing.
- **Sales chart** — A bar chart showing daily sales volume for the selected period.
- **Payment Links chart** — A bar chart showing daily payment link activity.
- **Deliveries chart** — A bar chart showing daily delivery order activity.
- **Activity feed** — A chronological list of recent events across sales, deliveries, and payment links.
- **Light / Dark mode toggle** — Switch between light and dark themes using the icon button in the top-right corner of the Dashboard toolbar. Your preference is applied immediately across the whole application.

![Dashboard overview](https://raw.githubusercontent.com/loom21/loom21doc/main/images/dashboard.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

<!-- PAYMENT LINKS -->
## Payment Links <a id="payment-links"></a>

A payment link is a unique URL you can share with customers to accept payments for a product, service, or donation — no login required on the buyer's side. Once created, you can copy the link, send it by email or message, or embed it anywhere.

**How to create a payment link:**

1. Navigate to **Payment Links** from the sidebar and click **New**.
2. Fill in the details:
   - **Name** — what the buyer will see (e.g. "Workshop Ticket").
   - **Currency** — the currency for this link.
   - **Amount** — the fixed price, or toggle **Variable Amount** to let the buyer enter their own amount within a min/max range you define.
   - **VAT** — enable and set a VAT percentage if applicable.
   - **VAT ledger category** — when the link has no VAT: what it sells (the same choices as on a sale), which decides its column in the [VAT Sales Ledger](#vat-ledger). Required when **Enable VAT** is on in [General settings](#general-settings).
   - **Description** — optional details shown to the buyer.
   - **Image URL** — add a product photo that appears on the payment page.
   - **Short Code** — a memorable short identifier for the link (optional).
   - **Expiration Date** — automatically deactivate the link after a specific date.
   - **Stock Count** — limit the total number of purchases through this link.
   - **Max Per Order** — limit how many units a single buyer can purchase at once.
3. Select the **payment methods** to offer (only enabled processors appear here).
4. Add **promo codes** if you want to offer discounts — each code has a name, a discount value, and a type (percentage or fixed amount).
5. Click **Save**.

**After saving**, the link URL is shown at the top of the page. Use the **Copy** button to copy it to your clipboard, or **Preview** to open it as a buyer would see it.

**Pausing a link** — click the status toggle to pause a published link (buyers will no longer be able to pay) or re-publish it. You will be asked to confirm the change.

#### Supported Payment Processors

| Processor | Payment Type |
|-----------|-------------|
| Stripe | Credit / Debit Card |
| BTCPay Server | Bitcoin Lightning & On-chain |
| Lightning Wallet (Glow) | Bitcoin Lightning & On-chain |
| Speed Wallet | Bitcoin Lightning & On-chain |
| LNBits | Bitcoin Lightning |

> :bell: More payment processors are coming soon.

![Payment Link](https://raw.githubusercontent.com/loom21/loom21doc/main/images/payment-link-add.gif)

<p align="right">(<a href="#docs-top">back to top</a>)</p>


## Sales<a id="sales"></a>

The Sales page lists all your sale orders. You can search by order number, customer name or note (press Enter or the magnifying glass). Create a new order with the **New Order** button, or open an existing order by clicking the purple arrow icon.

Click **Filters** to narrow the list. A filter applies as soon as you change it, and **Clear** resets them all:
- **Customer**, **Date Range** (by the sale's Order Date, the invoice date; both days are included) and **Min/Max Amount**.
- **Payment Status** and **Order Status**.
- **Document**: invoices or credit notes.
- **Annulled**: hide annulled invoices, or show only them.
- **Origin**: documents issued in Loom21, or those imported from your previous program (see [Moving From Another Program](#import-invoices)).
- **Store**, when you have more than one.

Credit notes, annulled invoices and imported documents each have a badge next to their number.

![Sales list](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sales-list-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Add/Edit Sales <a id="add-edit-sales"></a>

**Order header fields** (left panel):
- **Serial Number** — given automatically when the sale is first sent or paid, and never changed after that. Drafts have no number yet. See [Invoice Numbers and PDFs](#invoice-numbers).
- **PO Number** — the customer's purchase order reference, if applicable.
- **Order Date / Due Date** — when the order was placed and when payment is expected.
- **Status** — track the order through Draft, Sent, Paid, etc.
- **Store** — select which store the goods are dispatched from (affects inventory levels; not applicable for services).
- **VAT** — enable or disable VAT per order; the percentage is inherited from your General Settings.
- **Legal basis for no VAT** — shown when VAT is off: why no VAT is charged, for example the law that exempts you. It is filled in from your [General Settings](#general-settings) and printed on the invoice. Change it here for a single sale if needed.
- **VAT ledger category** — shown when VAT is off: what kind of sale without VAT this is: an intra-EU supply of goods to a business, distance sales or services to consumers in the EU (OSS), services to a business in the EU, an exempt supply (or one outside the scope of VAT), or an export of goods outside the EU. It decides the sale's column in the [VAT Sales Ledger](#vat-ledger). Once a category is chosen, the **Legal basis for no VAT** is required, and it is filled in with the standard legal text for that category (for example "чл. 28 от ЗДДС" for an export), except for exempt supplies, where it depends on what you sell. Credit notes and copies take the invoice's category.
- **Discount %** — apply an overall percentage discount to the order total.
- **Note** — any internal note or instructions.

**Adding items:**
- Type directly into the product search field to add items one at a time.
- Click **Select Items** to search and tick multiple products or services at once.
- Click **Order History** (available once a customer is selected) to view that customer's previous purchases and re-add items from past orders in one click.

**Automatic price resolution** — when you select a product and a customer, the system automatically looks up the best applicable price from your [Price Lists](#price-lists) and [Customer Price Overrides](#price-lists). The unit price field updates instantly; you can still edit it manually if needed.

**Customer selection** — search and select a customer to automatically populate the shipping and billing address. You can modify the address fields directly on the order if needed.

![Saved sale order](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sale-order-saved-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Payments <a id="payments"></a>

The toolbar on a saved order gives you quick access to all payment and document actions:

**Pay** — a dropdown button showing every enabled payment processor. Choose one to open the payment dialog:
- **Stripe** — the customer enters card details directly in a secure dialog.
- **Bitcoin processors** (BTCPay Server, Lightning Wallet (Glow), Speed Wallet, LNBits) — a QR code and Lightning/on-chain payment address is displayed. Bitcoin payments are confirmed in real time — the order status updates automatically the moment the transaction is settled, without needing to refresh the page.

**Send** — saves the order and opens a dialog with the payment URL and print URL that you can copy and share with the customer.

**Download** — a dropdown to generate and download PDF documents:
- **Quote** — available before payment.
- **Invoice** — available once the order is marked as paid.
- **Receipt** — available once the order is marked as paid.
- **Pickup List** — available at any time.

**Set as Paid** — manually mark the order as paid (for cash or other offline payments).

**Export JSON** — download the full order data as a JSON file.

**Copy Order** — creates a new draft order pre-filled with the same customer, line items, payment methods, addresses, VAT settings, discount, currency, and notes as the current order. The copy is a draft and opens immediately so you can review and adjust it; it gets its number when it is sent or paid. Use this to quickly repeat a previous order or use an existing order as a starting template.


![Share sale order](https://raw.githubusercontent.com/loom21/loom21doc/main/images/share-sale-order.png)

![Pay with bitcoin](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sale-order-lightning-payment.png)

![Pay with card](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sale-order-stripe-payment.png)

> :bell: All features within the application are protected by authentication, except for the links generated through the Send button.

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Invoice Numbers and PDFs <a id="invoice-numbers"></a>

**Numbers.** A sale gets its number the first time it is sent or paid. Drafts have no number, so a draft you delete leaves no gap. Invoices and credit notes share one continuous 10-digit sequence (0000000001, 0000000002, …). Once given, a number never changes, and you can't type your own. See [Invoicing Rules and Your Country](#country-rules).

**Already issued invoices in another program?** [Import them](#import-invoices): numbering then continues after your last one. If you'd rather not import them, before you issue your first invoice in loom21, set **First invoice number** in [General settings](#general-settings) to the number after your last invoice, so the sequence carries on with no duplicates. For example, if your last invoice was 0000001234, enter 1235. Once the first invoice has a number, the setting is locked.

**Issued sales can't be edited or deleted.** Only drafts can. To correct an issued invoice, issue a [credit note](#credit-notes); if it was issued by mistake and nothing has happened to it yet, [annul it](#annul-invoice).

**PDF language.** Every sale and delivery PDF (invoice, quote, receipt, pickup list, credit note, delivery, delivery list) is in Bulgarian when your language is Bulgarian, and in English otherwise.

**What the invoice and credit note print**, besides the usual details:
- **ORIGINAL**;
- the **tax point** (the date of supply): the order date, or for a credit note the date of the return or change;
- the **Company ID** and **VAT number** of both you and the customer. Enter yours under [General settings](#general-settings) and the customer's on the [customer](#customers-suppliers);
- the **tax base**: the amount VAT is charged on. With a discount it shows the amount, the discount and the tax base;
- when no VAT is charged, the **legal basis** for it.

In Bulgarian, these print with the wording Bulgarian VAT law uses.

**Other currencies.** An invoice or credit note in a currency other than EUR also prints the exchange rate, for example "Exchange Rate: 1 USD = 0.9234 EUR (ECB/BNB rate as of 02.10.2026)". It is the European Central Bank's reference rate for the tax point, or for the last working day before it if that was a weekend or holiday. The ECB publishes the day's rate in the afternoon, so an invoice issued before 17:15 Bulgarian time uses the previous working day's rate, and keeps it. A credit note uses its invoice's rate. A currency the ECB doesn't publish a rate for, such as BTC, prints no rate.

Below the rate, as required for tax purposes, the PDF shows the **EUR equivalent**: the tax base, the VAT and the total in EUR.

<!-- SCREENSHOT TODO: an invoice PDF, showing ORIGINAL, the tax point and both Company IDs.
![Invoice PDF](https://raw.githubusercontent.com/loom21/loom21doc/main/images/invoice-pdf-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Credit Notes <a id="credit-notes"></a>

A credit note corrects an invoice that has already been issued: goods came back, or the customer gets a discount afterwards.

**To create one:** open the invoice, open the **⋮** menu and choose **Create credit note**. Choose **What to credit**:
- **Lines** — enter how much of each line to credit (**Credit everything left** fills them all in). For each line choose whether it goes back to stock, and into which store. Services never go back to stock.
- **An amount** — a discount after the invoice. Enter what the customer gets back, VAT included; the VAT is split out at the invoice's rate. Nothing goes back into stock.

Then fill in:
- **Reason** (required) — printed on the credit note, e.g. "Goods returned".
- **Date of return or change** — when the goods came back or the price changed. If that was more than 5 days ago you get a warning, but you can still issue the credit note (see [Invoicing Rules and Your Country](#country-rules)).
- **Refund** — only if the invoice was paid. Record how you gave the money back (store credit, cash, bank transfer, card or Lightning), the date and a reference. This only records it: Loom21 doesn't send the money.

Press **Issue credit note**. It gets the next number, is issued straight away and can't be changed.

<!-- SCREENSHOT TODO: the credit note dialog with Lines selected: one line credited and returned to stock, the reason filled in.
![Credit note dialog](https://raw.githubusercontent.com/loom21/loom21doc/main/images/credit-note-dialog-light.png) -->

<!-- SCREENSHOT TODO: the credit note dialog with An amount selected.
![Amount credit](https://raw.githubusercontent.com/loom21/loom21doc/main/images/credit-note-amount-light.png) -->

**What else to know:**
- An invoice can have several credit notes, up to what was invoiced. Its **Credit notes** card lists them, with what is left to credit.
- What the customer still owes drops by the credit notes ("Left to pay after credit notes"), and payments charge only that.
- When everything is credited, the invoice becomes **Canceled** (and **Refunded** if it was paid).
- A credit note on an unpaid invoice records no refund: there was no money to give back. It lowers what the customer owes.
- Credit notes have a badge on the Sales list, and the **Document** filter shows invoices or credit notes. In the reports they are negative rows.
- Download the credit note PDF from its screen.

<!-- SCREENSHOT TODO: an invoice with its Credit notes card and "Left to pay after credit notes".
![Credit notes on an invoice](https://raw.githubusercontent.com/loom21/loom21doc/main/images/credit-notes-card-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Annulling an Invoice <a id="annul-invoice"></a>

An invoice issued by mistake (the wrong customer, a duplicate, the wrong VAT details) can be **annulled** rather than credited. Annulment follows Bulgarian VAT law; see [Invoicing Rules and Your Country](#country-rules).

**When you can annul:** only while the invoice is unpaid, has no credit notes, and was issued this calendar month. After that it may already be in a VAT return, so it is corrected with a credit note instead. When annulling isn't possible, the screen says why.

**To annul:** open the invoice, open the **⋮** menu and choose **Annul invoice**. Enter the reason (printed on the invoice and the protocol), and confirm that the customer has been told and won't record the invoice in their purchases ledger.

**What happens:**
- The invoice keeps its number and content, is marked **Annulled** (also on the PDF, with the reason) and becomes Canceled. Its goods go back into stock.
- It can't be changed, credited, sent or paid, and it is left out of the sales report.
- **Annulment protocol** downloads the protocol to sign with the customer.
- To issue the correct invoice, use **Copy Order**. The copy remembers which invoice it replaces, and the protocol names it once it is issued.

<!-- SCREENSHOT TODO: the Annul invoice dialog with a reason and the confirmation ticked.
![Annul invoice dialog](https://raw.githubusercontent.com/loom21/loom21doc/main/images/annul-dialog-light.png) -->

<!-- SCREENSHOT TODO: an annulled invoice: the Annulled badge, the banner and the Annulment protocol button.
![Annulled invoice](https://raw.githubusercontent.com/loom21/loom21doc/main/images/annulled-invoice-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Overpayments and Refunds <a id="overpayments"></a>

Sometimes a customer pays more than the invoice owes: a payment arrives after the invoice was canceled or credited, or the same invoice is paid twice. Loom21 emails you when that happens, and the invoice shows a warning with the amount to give back.

Loom21 doesn't send refunds. Give the money back yourself, then press **Record refund** on the warning and enter the amount and date. The warning shows what is left, and goes away when everything is refunded. Recorded refunds are taken off the [Dashboard](#dashboard) revenue.

<!-- SCREENSHOT TODO: the overpaid warning with the Record refund button, and the Record refund dialog.
![Overpaid invoice](https://raw.githubusercontent.com/loom21/loom21doc/main/images/overpaid-banner-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Moving From Another Program (Import Invoices) <a id="import-invoices"></a>

If you issued invoices with another program before Loom21, bring them in. You can then credit or annul them, collect what is unpaid, and Loom21's numbering simply continues after your last invoice. You can import only **before Loom21 issues its first invoice**; after that, the import closes.

**Before you start:** import your products and services (see [Import and Export](#import-templates)), so the invoice lines can be matched to them.

**How to use:**
1. Navigate to **Sales** and press **Import invoices**.
2. Press **Invoices Template** and fill in its two sheets:
   - **Documents**: one row per invoice or credit note, with its number, date, customer, currency, the totals as printed, and whether it was paid;
   - **Lines**: the lines of each document, with its number, the description as printed, quantity and unit price (without VAT, after any discount).

   Prefer CSV? **CSV Template** has the same columns on one sheet: one row per invoice line, with the document's columns repeated on each of its lines. Separate columns with commas or semicolons, write decimals with a dot, and save as UTF-8.
3. Press **Choose file**. Loom21 checks the whole file and lists every problem with its sheet, row and column. Fix them in the file and choose it again. Nothing is saved until the file is correct.
4. **Match the items.** Every line has to belong to one of your products or services. Loom21 finds most of them on its own: by product Id, barcode or code, or by exact name. The descriptions it can't place are listed once each, with how many lines use them and the closest products. Pick the product or service each one is. Choose **Create new product** or **Create new service** only if it really is new, so your catalog gets no duplicates. Loom21 remembers your choices for the next file.
5. **Review and import.** Check the summary, and answer one question: **which month's VAT return will you file from Loom21 first?** Then press **Import**.

**Good to know:**
- **The totals as printed win.** The lines, the VAT and any EUR amounts printed on the document must agree with them, to the cent.
- **Customers** are matched by Company ID, then VAT number, then name. Customers not found are added.
- **Paid invoices** get a payment on the date you give, so amounts due and the [Dashboard](#dashboard) are right.
- **Credit notes** name the invoice they correct, in the same file or an earlier import, and credit its lines.
- **Currency:** an empty Currency means your account's currency (Settings → General), so fill it in when your account is set to something else.
- **A document in another currency** needs the rate printed on it, as EUR for 1 unit (EurPerUnit) or, if the check asks for it, as units for 1 EUR (UnitsPerEur).
- **Stock isn't changed.** The goods left when the old program issued the invoice.
- **Imported invoices can't be edited.** They can be paid, credited and annulled. Their PDF says "COPY" and that the document was imported, because the original was issued by your previous program.
- **The VAT ledger** includes imported documents only from the first month you file from Loom21. Earlier months were filed by your previous program, so including them would declare them twice.
- **Years of invoices?** Split them into several files of up to 10,000 rows, and import the oldest first.
- **Made a mistake?** Under **Imported so far**, **Remove import** takes an import out completely, with its payments, until Loom21 issues its first invoice. Customers and products it added stay.

<!-- SCREENSHOT TODO: Sales → Import invoices with the "Match the items" step: two descriptions, one matched, one with the autocomplete open.
![Import invoices](https://raw.githubusercontent.com/loom21/loom21doc/main/images/import-invoices-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Invoicing Rules and Your Country <a id="country-rules"></a>

Loom21's invoicing was built to Bulgarian VAT law, and today it applies the same rules to every account, whatever country you are in. Most of them are what EU VAT rules ask of any invoice; a few are Bulgarian only. If you invoice outside Bulgaria, check the Bulgarian-only ones with your accountant.

| Rule | What Loom21 does | Where it comes from |
|---|---|---|
| Invoice numbers | One continuous sequence for invoices and credit notes, given when a sale is issued and never changed | EU VAT rules require sequential numbers. The 10-digit format is Bulgarian |
| Corrections | An issued invoice is corrected with a credit note, never edited or deleted | Common EU practice |
| Invoice details | Prints the tax point, the VAT numbers, the tax base, and the reason when no VAT is charged | On the EU list of required invoice details |
| "ORIGINAL" | Printed on invoices and credit notes | Bulgarian practice |
| Company ID | Printed when you fill it in | In Bulgaria the EIK. Elsewhere, enter your company registration number, or leave it empty |
| Credit note deadline | A warning when a credit note comes more than 5 days after the return or change. It never blocks | Bulgarian law |
| Annulment | Allowed only for an unpaid invoice with no credit notes, issued this calendar month (Bulgarian time) | Bulgarian law. Elsewhere, correct invoices with credit notes unless your accountant says annulling is allowed |
| [VAT Sales Ledger](#vat-ledger) | The Bulgarian sales ledger layout, document types and columns | Bulgarian law. Elsewhere, ask your accountant which columns they need |

We plan to let each account choose its country, so that these rules follow it.

<p align="right">(<a href="#docs-top">back to top</a>)</p>

<!-- REPORTS -->## Reports<a id="reports"></a>

The Reports section gives you detailed insight into your sales and delivery activity. Navigate to **Reports** from the sidebar to choose a report type.

<!-- ![Reports menu](screenshots/reports-menu.png) -->

### Sales Report<a id="sales-report"></a>

The Sales Report shows a full, searchable, and filterable list of every product or service that has been sold — one line per line item across all orders.

**How to use:**

1. Navigate to **Reports → Sales Report**.
2. Use the **search bar** at the top to find items by product name or serial number.
3. Click **Filters** to expand the filter panel and narrow results by:
   - **Date range** — select a start and end date.
   - **Category** — filter by product category.
   - **Measure** — filter by unit of measurement.
   - **Brand / Model** — filter by brand, and then by specific model within that brand.
   - **Customer** — type a customer name to search and filter by a specific buyer.
4. Press the **Search** button (magnifying glass) to apply your filters.
5. Click **Clear** to reset all filters and start fresh.
6. Use the **Export** menu to download the report with the current filters:
   - **Export Excel** — an .xlsx file with numbers and dates as real numbers and dates, ready to sort and sum.
   - **Export CSV** — a plain text file you can open in Excel or Google Sheets.
   - **Export JSON** — downloads a structured data file for technical use.
7. Results are sortable by clicking any column header. Use the **pagination** controls at the bottom to navigate through large result sets.
8. Click the arrow icon on any row to navigate directly to the original sale order.

Columns shown: Product name, barcode, serial number, quantity, note, unit price, total price, customer name, measure, category, and date.

Credit notes are negative rows with a badge, so totals are net of them. An amount credit is one row named after its reason. Annulled invoices are left out.

![Sales Report](https://raw.githubusercontent.com/loom21/loom21doc/main/images/sales-report.png)

<!-- SCREENSHOT TODO: the Sales Report Export menu open, showing Export Excel.
![Report export menu](https://raw.githubusercontent.com/loom21/loom21doc/main/images/report-export-menu-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Deliveries Report<a id="deliveries-report"></a>

The Deliveries Report provides the same detailed, filterable view for delivery orders — showing every product that has been received as a delivery, along with supplier and date information.

Use it in the same way as the Sales Report: apply filters, search, sort, and export as needed.

![Deliveries Report](https://raw.githubusercontent.com/loom21/loom21doc/main/images/deliveries-report.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### VAT Sales Ledger<a id="vat-ledger"></a>

The VAT sales ledger is the month's list of sales your accountant imports into their accounting software to file your VAT return. It follows Bulgarian VAT rules (see [Invoicing Rules and Your Country](#country-rules)) and is only available when **Enable VAT** is on in [General settings](#general-settings), which means your company is registered for VAT.

**How to use:**
1. Navigate to **Reports → VAT sales ledger**. It opens on last month.
2. Choose the **Month** and **Year**.
3. Check the list under **Check these before importing**, if there is one, and fix what it points to.
4. Open **Export** and choose **Export Excel** or **Export CSV**, then send the file to your accountant.

**What goes in it:**
- **Invoices** — in the month of their tax point (the order date).
- **Credit notes** — in the month they were issued, with **negative** amounts, and the number and date of the invoice they correct.
- **Annulled invoices** — with their number, date and customer, and every amount **0.00**.
- **Sales through payment links** — one line for the whole month (numbered year, month and 02, e.g. 20261002), as sales without an invoice, split by VAT rate and less any refunds.
- **[Imported invoices](#import-invoices)** — only from the first month you file from Loom21. In earlier months they are left out, and the screen says so: your previous program filed them.

**Which column a sale goes in:**
- A sale with VAT goes in the **20%** or the **9%** column, by its VAT rate.
- A sale without VAT goes in the column of its **VAT ledger category**, chosen on the sale. Payment links without VAT go in the column of the link's category.
- All amounts are in **EUR**. A sale in another currency is converted at the rate printed on its invoice or credit note (see [Invoice Numbers and PDFs](#invoice-numbers)), so its ledger amounts are exactly the PDF's EUR equivalent. The screen shows its currency, the rate and the rate's date.
- A customer with no Company ID and no VAT number counts as a private individual: both are filled with fifteen nines, as Bulgarian practice requires.

**The exported file** has the columns your accountant's software imports, with Bulgarian headers, in this order:
1. row number;
2. document type (01 invoice, 02 sales without an invoice, 03 credit note);
3. document number;
4. issue date;
5. tax point date;
6. customer name;
7. Company ID (ЕИК);
8. VAT number;
9. for a credit note, the invoice's number;
10. for a credit note, the invoice's date;
11. the total with VAT (ledger column 9);
12. then the amounts for ledger columns 11, 12, 13 and 14 (20% and 9% with their VAT), 16 (exports), 17 (intra-EU goods), 19 (distance sales), 21 (services to EU businesses) and 25 (exempt).

Dates are written as DD.MM.YYYY and amounts with two decimals. The currency, the rate and the warnings aren't in the file: they are on the screen, and the warnings are also on the Excel file's second sheet.

**What the ledger flags.** It never guesses. These are listed on the screen, marked on their rows, and put on a second sheet in the Excel file:
- a sale in a currency with no ECB rate, such as BTC (its amounts stay in that currency);
- a rate not yet published for the day (the last one is used: export again later);
- a sale without VAT with no VAT ledger category (choose one on the sale);
- a VAT rate other than 20% or 9%;
- payment links without VAT and without a VAT ledger category, or in a currency with no ECB rate.

<!-- SCREENSHOT TODO: Reports → VAT sales ledger for a month, with a few rows and the "Check these before importing" list.
![VAT sales ledger](https://raw.githubusercontent.com/loom21/loom21doc/main/images/vat-ledger-light.png) -->

<p align="right">(<a href="#docs-top">back to top</a>)</p>

<!-- SETTINGS -->
## Settings<a id="settings"></a>

Configure your organization's preferences and payment processors here. Payment processors must be set up in this section before they become available as options at checkout or in payment links.

### General settings <a id="general-settings"></a>

This is where you configure your organization's core identity and preferences. These settings affect the whole application.

**Company details:**
- **Company Name, Email, Phone** — appear on printed invoices and documents.
- **Billing Address** — your organization's address, also printed on documents.

**Localization:**
- **Language** — changes the application language. The page reloads automatically when you save a language change.
- **Currency** — your primary operating currency. Affects prices, totals, and reports throughout the app.
- **Default Store** — the store pre-selected when creating new sales and deliveries.

**VAT settings:**
- **Enable VAT** — turns VAT on globally. You can still toggle it per order.
- **VAT Number** — your organization's tax registration number, printed on invoices.
- **Company ID (EIK)** — your company registration number (in Bulgaria, the EIK), printed on invoices and credit notes.
- **First invoice number** — if you issued invoices before loom21, the number after your last one; empty starts at 1. The hint shows the number the next invoice will get. It can only be changed until the first invoice or credit note is issued, then it is locked, so the numbering never has gaps or duplicates.
- **VAT Percentage** — the default rate applied to new orders.
- **Legal basis when no VAT is charged** — why your invoices carry no VAT, for example because you aren't registered for VAT. It is filled in on new sales without VAT and printed on their invoices. EU VAT rules require a reason on every invoice without VAT.

**Inventory control:**
- **Forbid Negative Quantity** — when enabled, the system will not allow a sale that would take a product's stock below zero.

**Bitcoin settings:**
- **Hide Bitcoin Prices** — removes all Bitcoin price displays and payment options across the app.
- **Override Bitcoin Rate** — lets you enter a fixed exchange rate instead of using the live market rate. Useful for invoicing in a fixed BTC price.
- **Use Bitcoin Only** — hides fiat totals and shows only Bitcoin amounts.

**Theme:**
- **Dark Mode** — toggle between light and dark theme. This can also be toggled quickly from the [Dashboard](#dashboard).

<!-- SCREENSHOT TODO: general-setting-light.gif is out of date: it doesn't show Company ID (EIK), First invoice number or Legal basis when no VAT is charged. -->
![General Settings Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/general-setting-light.gif)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Subscription<a id="subscription"></a>

Shows your current loom21 plan — name, billing interval, and renewal/expiry date — plus the
same feature summary shown when choosing a plan (users, orders, stores, user access, API
access).

Click **Change Subscription** to open the plan picker and switch plans, or **Choose a Plan**
if you don't have an active subscription yet.

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Stripe<a id="stripe"></a>
- To accept fiat payments via Stripe, configure your Stripe Publishable and Secret keys.

![Stripe Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/stripe-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### BTCPay Server<a id="btcpay-server"></a>
- Self-hosted Bitcoin payment processor supporting both Lightning and on-chain payments.
- Configure your BTCPay Server URL and API Key to enable it.

![BTCPay Server Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/btcpay-server-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Lightning Wallet (Glow)<a id="lightning-wallet"></a>
- Non-custodial Bitcoin wallet supporting both Lightning and on-chain payments.
- Enter your Glow (or other LNURL-compatible) lightning address to enable it.
- Use the **Test Connection** button to check whether this wallet supports real-time payment confirmation before going live with it.

![Lightning Wallet (Glow)](https://raw.githubusercontent.com/loom21/loom21doc/main/images/misty-breez.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Speed Wallet<a id="speed-wallet"></a>
- Bitcoin wallet supporting both Lightning and on-chain payments.
- Enter your Speed Wallet API Key to enable it.

![Speed Wallet](https://raw.githubusercontent.com/loom21/loom21doc/main/images/speed-wallet.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### LNBits<a id="lnbits"></a>
- Open-source Lightning Network accounts system. Supports multiple wallets and extensions.
- Configure your LNBits URL and API Key to enable it.

![LNBits](https://raw.githubusercontent.com/loom21/loom21doc/main/images/lnbits.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Product Settings<a id="product-settings"></a>

The **Product Settings** section (found under Settings in the sidebar) groups several configuration pages that control how your products are organized, described, and priced. Use the sub-navigation to switch between:

- **Brands & Models** — manufacturers and product model lines
- **Categories** — groups for organizing products
- **Measures** — units of measurement
- **Custom Fields** — additional fields you define for product data
- **Price Lists** — tiered and customer-specific pricing rules

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Product Categories <a id="product-categories"></a>

Categories let you group related products together, making them easier to find and filter across the app — on the Products list, in Inventory, and in Reports.

**Adding a category:**

1. Navigate to **Settings → Product Settings → Categories**.
2. Click **Add** (or the **+** button) to open the category form.
3. Enter a **Name** for the category (e.g. "Electronics", "Clothing", "Raw Materials").
4. Click **Save**. The new category appears in the list and is immediately available to assign to products.

**Editing a category:**

1. Find the category in the list and click the **edit** icon on its row.
2. Update the name as needed.
3. Click **Save**. The change is reflected everywhere the category is used.

**Deleting a category:**

1. Click the **delete** icon on the category row.
2. Confirm the deletion when prompted.

> Products already assigned to that category are not deleted — they simply lose the category association and will show no category until you reassign them.

![Product Categories Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-categories-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Measures<a id="measures"></a>

Measures define the units of measurement used when describing product quantities — for example, kilograms, liters, pieces, or meters. Once defined, a measure can be assigned to any product or service and is used throughout the app in inventory, sales, and reports.

**Adding a measure:**

1. Navigate to **Settings → Product Settings → Measures**.
2. Click **Add** (or the **+** button) to open the measure form.
3. Enter a **Name** for the unit (e.g. "Kilogram", "Piece", "Liter").
4. Click **Save**. The measure is now available to assign to products and services.

**Editing a measure:**

1. Find the measure in the list and click the **edit** icon on its row.
2. Update the name as needed.
3. Click **Save**. The updated name is reflected wherever the measure is used.

**Deleting a measure:**

1. Click the **delete** icon on the measure row.
2. Confirm the deletion when prompted.

> Products already using that measure are not deleted — they simply lose the measure association and will show no unit until you reassign them.

![Measures Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/measures-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Brands & Models<a id="brands"></a>

If your products are associated with manufacturers or brand names, you can manage those brands here. Each brand can have multiple models beneath it, which you can then assign to individual products for more detailed categorization and reporting.

**How to use:**

1. Navigate to **Settings → Product Settings → Brands**.
2. Click **Add** to create a new brand. Enter the brand name, an optional description, and a logo URL if you have one.
3. Click a brand in the list to see its details on the right side and manage its models.
4. Within the brand detail panel, click **Add Model** to create models (e.g. specific product lines or versions) belonging to that brand.
5. Use the edit and delete buttons to update or remove brands and models as needed.

Once brands and models are set up, you can assign them to products on the product edit page. This lets you filter the Sales Report by brand or model to see exactly which product lines are performing best.

![Brands and Models](https://raw.githubusercontent.com/loom21/loom21doc/main/images/brands-models.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Custom Fields<a id="custom-fields"></a>

Custom Fields let you add your own data fields to every product in your catalog — beyond the standard fields like name, price, and category. For example, you might add a "Warranty Expiry Date," a "Supplier Reference Number," or a "Certified" checkbox.

**How to use:**

1. Navigate to **Settings → Product Settings → Custom Fields**.
2. Click **Add Field** to define a new custom field. You will be asked to enter:
   - **Label** — the name shown on the product form (e.g. "Warranty Expiry").
   - **Field Name** — a short internal identifier (no spaces, e.g. `warrantyExpiry`).
   - **Data Type** — choose from Text, Number, Decimal, Yes/No, or Date.
   - **Required** — whether the field must be filled in before saving a product.
   - **Default Value** — an optional pre-filled value.
3. Use the **drag handle** (the grip icon on the left) to reorder fields — this controls the order they appear on the product form.
4. Use the **toggle switch** to activate or deactivate a field without deleting it. Inactive fields are hidden on product forms but their data is preserved.
5. Click the **edit** or **delete** icons to modify or remove a field definition.

Once custom fields are defined, they appear as an additional tab called **Custom Fields** on every product's edit page, where you can fill in the values for each product.

![Custom Fields settings](https://raw.githubusercontent.com/loom21/loom21doc/main/images/custom-fields-settings.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Price Lists<a id="price-lists"></a>

Price Lists give you full control over your pricing strategy. Instead of using a single fixed price per product, you can create multiple price lists — for example, a "Wholesale" list with lower prices, a "Retail" list, or a seasonal promotion — and assign specific prices per product within each list.

Within each price list you can also set **quantity-based tiers** (the price automatically drops when the customer orders more), apply **percentage discounts**, or even define a **formula** that calculates the price dynamically.

In addition, you can set **customer-specific price overrides** directly on a product — so one particular customer always gets a special price regardless of the active price list.

#### Creating a Price List

1. Navigate to **Settings → Product Settings → Price Lists**.
2. Click **New Price List** to expand the creation form.
3. Enter a **name** (e.g. "Wholesale 2025"), select the **currency**, and optionally set a **Valid From / Valid To** date range to make the list active only during a specific period.
4. Check **Default** if this should be the primary price list used when no other rule matches.
5. Click **Save**. The new list appears in the left panel.

#### Adding Products and Tiers to a Price List

1. Click on a price list in the left panel to open it.
2. In the **Tiers** section, use the product search box to find the product you want to add.
3. Fill in:
   - **Min Qty** — the minimum quantity the customer must order to get this price (leave blank for "any quantity").
   - **Price** — the sale price for this product in this list.
   - **Discount %** — an optional percentage discount applied on top of the price.
   - **Formula** — an advanced option that lets you enter a mathematical expression to calculate the price automatically (e.g. `BasePrice * 0.85` to always apply a 15% reduction). Available variables: `BasePrice`, `Quantity`, and any custom fields you have defined.
4. Click **Add Tier**. You can add multiple tiers for the same product with different minimum quantities to create volume-based pricing steps.
5. Use the **edit** and **delete** icons on each tier row to modify or remove them.

#### Activating or Deactivating a Price List

- Use the **toggle switch** next to each price list name to activate or deactivate it without deleting it.

#### Deleting a Price List

- Click the **delete** icon next to the price list. You will be asked to confirm. Deleting a price list also removes all its tiers.

![Price Lists settings](https://raw.githubusercontent.com/loom21/loom21doc/main/images/price-lists.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

### Import and Export (Excel and CSV)<a id="import-templates"></a>

Products, services, customers and suppliers can be exported to a spreadsheet and imported from one, to add many records at once or to change many at once. Excel (.xlsx) and CSV (.csv) both work; Excel is recommended.

**Where:**
- **Export** — on the Products, Services, Customers or Suppliers screen, open **Export** and choose **Export Excel**, **Export CSV** or **Export JSON**.
- **Import** — the **Import** button on the same screen.
- **Empty templates** — **Settings → Product Settings → Import Templates**, or **Import template (Excel)** in a screen's Export menu. The templates include your [custom fields](#custom-fields).
- **Past invoices** from another program have their own template and import: see [Moving From Another Program](#import-invoices).

#### Adding new records

1. Download the template.
2. Fill in one row per record. Only **Name** is required; leave out any column you don't need. Column order and capital letters don't matter.
3. Import the file on the matching screen.

#### Changing records you already have

1. **Export** the records to Excel.
2. Change what you need in the file: prices, names, categories, custom fields and so on.
3. **Import** the file on the same screen. The records are updated; no copies are made.

This works because every export has an **Id** column, which tells the import which record a row belongs to. In Excel the column is hidden so it isn't changed by accident:
- **Excel** — click the triangle in the top-left corner to select the whole sheet, then right-click any column letter and choose **Unhide**.
- **Google Sheets** — click the small arrows at the left edge of the **B** column header, or right-click a column header and choose **Unhide columns**. Open the file in Google Sheets first; Drive's preview can't do this.

<!-- SCREENSHOT TODO: an exported products file in Excel or Google Sheets with the Id column shown.
![The Id column](https://raw.githubusercontent.com/loom21/loom21doc/main/images/export-excel-id-column.png) -->

**Good to know:**
- **Leave the Id values alone.** A row without an Id is added as a new record. An Id from another account, or from a service in the products file, is refused.
- **Only the columns in the file are changed.** You can import a file with just **Id** and **PriceSale** to update prices; everything else stays as it was. An empty cell in a column that *is* in the file clears that value.
- Save the file as **.xlsx** (in Google Sheets: **File → Download → Microsoft Excel**) or **.csv**. For customers and suppliers use .xlsx: CSV can hold only one sheet, so the Addresses sheet would be lost.

#### If the import finds problems

Nothing is saved until the whole file is correct. The screen lists the first problems, each with its row number as you see it in the spreadsheet, for example:
- "Row 4: PriceSale must be a number."
- "Row 7: Name is required."
- "Row 9: Supplier "Nobody" isn't one of your suppliers. Add it under Suppliers first."
- "Addresses row 3: more than one row is named "Shop". Fill in CompanyId."

Fix them in the file and import it again. Files can be up to 10 MB and 10,000 rows.

<!-- SCREENSHOT TODO: the message after importing a file with a few mistakes.
![Import problems](https://raw.githubusercontent.com/loom21/loom21doc/main/images/import-problems-light.png) -->

#### Products & Services columns

| Column | Required | Description |
|---|---|---|
| `Id` | No | Filled in by the export. Leave it empty for a new product (hidden in Excel) |
| `Name` | **Yes** for new rows | The product or service name (up to 256 characters) |
| `PriceSale` | No | Selling price (0 or more) |
| `PriceDelivery` | No | Cost / delivery price (0 or more) |
| `BtcPriceSale`, `BtcPriceDelivery` | No | Prices in bitcoin |
| `Code` | No | Your internal product code or SKU (up to 50 characters) |
| `Abr` | No | Short abbreviation for the product name |
| `Barcode` | No | Barcode number. Leading zeros are kept |
| `QrCode` | No | QR code text |
| `Category` | No | Category name. A new one is created if it doesn't exist |
| `Measure` | No | Unit of measurement. A new one is created if it doesn't exist |
| `Brand` | No | Brand name. A new one is created if it doesn't exist |
| `Model` | No | Model of that brand. Needs a `Brand`; a new one is created if it doesn't exist |
| `Supplier` | No | Supplier name. The supplier must already exist under [Suppliers](#customers-suppliers) |
| `Note` | No | Internal note |
| `Image` | No | URL to a product image |
| `Discontinued` | No | `TRUE` or `FALSE` |
| *your custom fields* | Depends | One column per [custom field](#custom-fields), named after its label. A required field must be filled in when its column is in the file. A field with a format must match it |

> Services use the same columns as products. Names are matched without regard to capital letters.

#### Customers & Suppliers columns

| Column | Required | Description |
|---|---|---|
| `Id` | No | Filled in by the export. Leave it empty for a new record (hidden in Excel) |
| `Name` | **Yes** for new rows | Company or person name |
| `ContactName` | No | Name of the primary contact person |
| `Email`, `Phone`, `Website` | No | Contact details |
| `EIK` | No | Company ID (registration number), printed on invoices. A column named `Bulstat` works too |
| `TaxNumber` | No | VAT or tax registration number |
| `PriceList` | No | Customers only: the name of one of your [Price Lists](#price-lists) |
| `Note` | No | Internal notes |
| `BitcoinAddress` | No | Bitcoin address for the contact |

**Addresses.** In Excel, addresses are on a second sheet, **Addresses**, with one row per address:

| Column | Description |
|---|---|
| `Company` | The customer's or supplier's name, as on the first sheet |
| `Name`, `Phone` | A name for the address (e.g. "Office") and its phone number |
| `AddressLine1`, `AddressLine2`, `City`, `Region`, `Postcode`, `Country` | The address |
| `Default` | `TRUE` for the default address |
| `Id`, `CompanyId` | Filled in by the export (hidden). Leave them empty for a new address |

- An address row belongs to the company on the first sheet with that name, which can be one added by the same file, or else to your existing customer or supplier with that name.
- A company's first address becomes its default unless you set one.
- Addresses missing from the file are kept, not deleted.

In CSV, a customer or supplier has one address in the columns `AddressLine1`, `AddressLine2`, `City`, `Region`, `Postcode` and `Country`: the default address.

<!-- SCREENSHOT TODO: import-templates-light.PNG shows the old page; retake it with the four buttons and the explanation. -->
![Import Templates Setup](https://raw.githubusercontent.com/loom21/loom21doc/main/images/import-templates-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Accounts <a id="accounts"></a>

The Accounts page shows all users who have access to your organization. Each row displays the user's email, first name, last name, company name, website, and phone number.

**Inviting a new user:**
1. Click the **Invite** button.
2. Fill in the new user's **email address**, **password**, first name, last name, and phone.
3. Assign one or more **Roles** using the checkboxes — roles control which parts of the app the user can access.
4. Save — the user can now sign in with the credentials you created.

**Editing a user:**
- Click the edit icon on any row to update their details or change their role assignments.

**Removing a user:**
- Open the user's edit page and click **Delete** to remove their access.

You can invite an unlimited number of users to your organization.

![Invite account](https://raw.githubusercontent.com/loom21/loom21doc/main/images/account-invite-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Products and Services <a id="products-services"></a>
The Products list lets you search by name or code, filter by Category, Measure, Brand, and Model (selecting a Brand enables the Model filter), and import or export your catalog as Excel, CSV or JSON (see [Import and Export](#import-templates)). The table shows each product's name, code, abbreviation, measure, category, barcode, delivery price, sale price, and creation date.

![Products list](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-list-light.PNG)

Click **New Product** to create one, or click the arrow icon on any row to open it. Available fields:

- **Name** (required), **Abbreviation**, **Code**, **Note**
- **Category**, **Measure**
- **Brand & Model** — assign to a brand and model (configured in [Brands & Models](#brands)); selecting a brand enables the model dropdown.
- **Delivery Price** — the cost price used when receiving stock via delivery orders.
- **Sale Price** — the default selling price (can be overridden by [Price Lists](#price-lists)).
- **Bitcoin prices** — if Bitcoin is enabled, separate Bitcoin price fields appear with arrow buttons to convert between fiat and Bitcoin at the current exchange rate.
- **Barcode & QR Code** — enter or scan a barcode; a QR code is generated automatically.

![Product edit](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-pricing.png)

#### Custom Fields Tab

If you have defined custom fields in [Settings → Custom Fields](#custom-fields), each product's edit page will include a **Custom Fields** tab. Here you can fill in the values for those extra fields — such as a warranty date, a supplier reference, or any other information specific to your business.

1. Open a product by clicking the purple arrow on the Products list.
2. Click the **Custom Fields** tab.
3. Fill in the values for each field displayed.
4. Click **Save** to store the custom data for this product.

![Product Custom Fields](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-custom-fields.png)

#### Pricing Tab

Each product also has a **Pricing** tab that lets you view and manage how this specific product is priced across all your price lists, as well as any customer-specific overrides.

**Price List Tiers** — For each price list you have created, you can see the pricing tiers already set for this product. You can delete a tier here; to add new tiers or edit existing ones, navigate to **Settings → Product Settings → Price Lists**.

**Customer Price Overrides** — You can set a special price for a specific customer for this product. Click **Add individual price** to:
- Search for and select a customer.
- Enter the override price (and optionally a minimum quantity, a formula, or a validity date range).
- Click **Save**.

**Test Price Resolution** — Enter a quantity and optionally select a customer, then click **Resolve Price** to see exactly which price the system will calculate for that combination. The result shows the final price and whether it came from a customer override, a price list tier, or the base product price.

![Product Pricing](https://raw.githubusercontent.com/loom21/loom21doc/main/images/product-pricing.png)

#### Services Management

Services are managed from a dedicated **Services** page in the sidebar. The list supports the same search, filter (Category, Measure), import, and export (Excel, CSV or JSON) capabilities as the Products list.

**Service fields:**
- **Name** (required), **Abbreviation**, **Code**, **Note**
- **Category**, **Measure**
- **Delivery Price**, **Sale Price** (and Bitcoin equivalents if Bitcoin is enabled)
- **QR Code** — auto-generated from the code field for easy scanning.

Services differ from products in two key ways:
- They are **not tracked in inventory** — selling a service never reduces stock.
- They have no **Brand**, **Model**, **Barcode**, **Custom Fields tab**, or **Pricing tab**.

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Inventory <a id="inventory"></a>

The Inventory page shows current stock levels for all your products across all stores. Stock is updated automatically as you record sales (which reduce stock) and delivery orders (which add stock).

**Filtering inventory:**
Click **Filters** to expand the filter panel and narrow the list by:
- **Search** — find a product by name.
- **Store** — show stock levels for a specific location.
- **Category, Measure, Brand, Model** — further narrow to specific product groups.

The table shows each product's current quantity, unit of measure, category, brand, and model.

**Manual stock adjustments:**
Click the edit icon on any product row to open the adjustment dialog:
- **Add** — enter a quantity and select a store to increase stock (e.g. after a physical stock count).
- **Remove** — enter a quantity and select a store to decrease stock.

This is useful when correcting discrepancies found during a stock count, or recording stock that was damaged or returned.

![Inventory](https://raw.githubusercontent.com/loom21/loom21doc/main/images/inventory-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Stores <a id="stores"></a>

Stores represent your physical locations or warehouses. Inventory is tracked per store, and each sale or delivery order is linked to a specific store.

**Store list** — stores are displayed as cards, each showing the store name, abbreviation, address, and phone number.

**Adding or editing a store:**

1. Click **Add Store** (or the edit button on an existing store card).
2. Fill in:
   - **Name** (required) — the full name of the store or location.
   - **Note** — any internal notes.
   - **Address** — street address and phone number for this location.
3. Click **Save**.

To delete a store, open it and click the **Delete** button.

![Stores](https://raw.githubusercontent.com/loom21/loom21doc/main/images/stores-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Delivery Orders <a id="deliveries"></a>

Delivery orders record incoming stock from suppliers. Each delivery you confirm automatically increases the inventory of the received products in the selected store.

- **Create** a new delivery order with the **New** button.
- **Search** existing orders and open them with the purple arrow icon.

![Deliveries List](https://raw.githubusercontent.com/loom21/loom21doc/main/images/deliveries-list-light.PNG)

#### Delivery Order Details

**Order header fields** (left panel):
- **Order Number** — auto-generated reference, editable.
- **Order Date / Due Date** — when the order was created and when it is expected.
- **Supplier** — search and select the supplier for this delivery.
- **Store** — the destination store where received stock will be added.
- **Include Tax** — toggle whether tax is included in item prices.
- **Status** — track the delivery from Draft through to Delivered.
- **Note** — any internal remarks.

**Adding items:**
- Search for products by name and add them one at a time, or use **Select Items** to multi-select.
- Enter the quantity and unit price for each item received.
- The subtotal, VAT, and grand total are calculated automatically.

**Documents** — use the **Download** button to generate and download a PDF:
- Delivery invoice, receipt, or pickup list.

**Address** — the supplier's delivery address is populated automatically when you select a supplier. You can edit it per order if needed.

![Delivery Edit](https://raw.githubusercontent.com/loom21/loom21doc/main/images/delivery-edit-light.PNG)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## Customers and Suppliers <a id="customers-suppliers"></a>
This page allows you to easily manage your customer database. Key features include:
- Search Customers: Quickly find customers by name using the search bar.
- Import and export customers: add or update many customers at once from an Excel or CSV file (see [Import and Export](#import-templates)).
- Create or Edit Customers: Add new customers by pressing the blue button or modify existing customer details by clicking the purple arrow.

![Customers list](https://raw.githubusercontent.com/loom21/loom21doc/main/images/customers-light.PNG)
On this page, you can manage and update detailed information for each customer. The available fields include:

#### Customer Details
- **Name** — the customer's full company or person name.
- **Contact Name** — the specific person to address at that company.
- **Company ID (EIK)** — the customer's company registration number (in Bulgaria, the EIK), printed on invoices and credit notes.
- **Tax Number** — the customer's VAT or tax registration number, printed on invoices.
- **Note** — any internal notes about this customer.
- **Phone, Email, Website** — contact details.
- **Price List** — optionally assign one of your [Price Lists](#price-lists) to this customer. When set, all new sale orders for this customer automatically use that price list instead of the default one.
- **Multiple Addresses** — add and manage multiple delivery or billing addresses for the customer.

<!-- SCREENSHOT TODO: customer-edit-light.PNG doesn't show the Company ID (EIK) field. -->
![Customer Edit](https://raw.githubusercontent.com/loom21/loom21doc/main/images/customer-edit-light.PNG)

#### Suppliers Management

Suppliers are managed in a dedicated **Suppliers** section accessible from the sidebar. The list view lets you search, import, export (Excel, CSV or JSON), and paginate through your supplier records. See [Import and Export](#import-templates).

**Supplier details** (when creating or editing):
- **Name** (required), **Contact Name**, **Company ID (EIK)**, **Tax Number**, **Note**
- **Phone**, **Email**, **Website**
- **Multiple Addresses** — add as many delivery addresses as needed.

The key distinction from customers is in their usage:
- **Suppliers** are selected when creating **Delivery Orders** (incoming stock).
- **Customers** are selected when creating **Sale Orders** (outgoing sales).

Unlike customer records, suppliers do not have a Price List assignment.

<p align="right">(<a href="#docs-top">back to top</a>)</p>

## User Profile<a id="user-profile"></a>

Click your name or the profile icon in the top navigation bar to access your **User Profile**. Here you can update your personal information independently of the organization-wide settings.

**Profile Information:**
- First Name, Last Name
- Email address
- Phone number
- Company Name
- Website

Click **Save** to apply any changes.

**Change Password** — a separate form at the bottom of the page:
1. Enter your **Current Password**.
2. Enter a **New Password** (minimum 8 characters).
3. Confirm the new password.
4. Click **Change**.

![User Profile](https://raw.githubusercontent.com/loom21/loom21doc/main/images/user-profile.png)

<p align="right">(<a href="#docs-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

loom21 - [@loom21app](https://x.com/loom21app)

Project Link: [https://github.com/loom21/loom21doc](https://github.com/loom21/loom21doc)

<p align="right">(<a href="#docs-top">back to top</a>)</p>
