<template>
    <section class="home">
        <div class="container">
            <h1>Contact Page</h1>
            
        
            <form @submit="onSubmit" method="post" class="customForm" id="myForm">

                    <label>Your Name</label>
                    <input type="text"
                            class="form-control"
                            v-model="formInputs.yourName"
                            placeholder="Please Enter Your Full Name" required />

                    <label>Your Email</label>
                    <input 
                            type="email"
                            class="form-control"
                            v-model="formInputs.yourEmail"
                            placeholder="Please Enter Your Address" required />

                    <label>Subject</label>
                    <input 
                            type="text"
                            class="form-control"
                            name="Subj"
                            v-model="formInputs.yourSubject"
                            placeholder="Please Enter Your Subject" required />
                    
                    <label>Message</label>
                    <textarea 
                            name="Msg"
                            v-model="formInputs.yourMessage"
                            class="form-control"
                            placeholder="Description..."></textarea>
        
                    <button class="btn btnCustom" id="postsubmit" >Submit Data</button>
                
                </form>

                <h2 v-if="formStatus"> {{formStatus}} </h2>

        </div>
    </section>
</template>

<script>
import contactServices from '@/services/contact/contact'

export default {
    name: 'Contact_Page',
    data() {
        return {
            formInputs: {
                yourName: 'Amoos',
                yourEmail: 'info@me.now',
                yourSubject: 'Welcome',
                yourMessage: 'Something',
            },
            formStatus: "null"
        }
    },
     methods : {

        async onSubmit(e) {
            e.preventDefault();

            const emailBody = {
                "yourName": this.formInputs.yourName,
                "yourEmail": this.formInputs.yourEmail,
                "yourSubject": this.formInputs.yourSubject,
                "yourMessage": this.formInputs.yourMessage,
            };

            // Create a FormData object, and append each field to the object
            const form = new FormData();
            for (const field in emailBody) {
                form.append(field, emailBody[field]);
            }


           try {
                let resp = await contactServices.sendEmail(6, form)
                if ( resp.status == 200 ) {
                    this.posts = resp.data;
                    this.formStatus = "Contact form submited!"
                    console.log("You Logged In: ", resp.data)
                }
           } catch ( err ) {
               this.formStatus = "Try agin!"
           }
    
           }
       },
}
</script>