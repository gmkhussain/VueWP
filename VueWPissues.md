# Issue / Error

## vue create cannot be loaded
 vue : File C:\Users\<abcxyz>\AppData\Roaming\npm\vue.ps1 cannot be loaded because running scripts is disabled on this 
system. For more information, see about_Execution_Policies at http://go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1

Solution: 
```C:\Users\<abcxyz>\AppData\Roaming\npm```
Rename ```vue.ps1``` with ```vue.ps1_old```









## Async await function not working with setInterval 

```js
// ...
  mounted() {

    let myTempDataIdForInterval = this.myDataId;

    const interval = setInterval(() => {
        console.log("Works fine!");
        this.myDemoFunc( myTempDataIdForInterval )
        // clearInterval(interval);
    }, 2000);

    interval(); // <-- RECALL FROM HERE

    /*
     callback function will not work with setInterval
     */
    //  setInterval(function() {
    //   // console.log("amoos", amoos )
    //      this.myDemoFunc( this.myDataId )
    //   fn();
    //  },2000)
 
    // ...
  },
// ...
```