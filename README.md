This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Warehouse App

## Setting up new Zebra 
1. Open DataWedge App on Zebra: This app is downloaded by default on all Zebra devices
2. Tap the 3 dots on the top right > Settings > Restore (Restore to factory defaults)
3. Open IdentityGuardian
   1. Open Associated Apps > Click 3 dots > New app/activity > com.android.chrome > *
4. Open Profile0
   1. Scroll down to 'Keystroke Output'
     1. Mark 'Enabled'
     2. Open 'Basic Data Formatting'
        1. Mark 'Enabled' checked
        2. Mark 'Send Data' checked
        3. Mark 'Send ENTER Key' checked
    2. Scroll to 'Barcode Input'
      1. Mark 'Enabled' checked


Now you should be able to go to the application and scan in orders!

If this does not work, restart the process from the beginning. 



## Deployed application on Vercel
[Warehouse Management](https://warehouse-management-nu.vercel.app/)


## If deploying changes to Warehouse Management repository 
Please be sure to open Pull Requests for all changes and fill out the PR templates accordingly. All changes should be relatively small (less than 250 changes if you can help it) and clearly documented. 


