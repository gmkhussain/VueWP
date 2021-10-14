<template>
    <section class="home">
        <div class="container">
            <h1>Contact Page</h1>
            
                <form @submit="onSubmit" method="post" class="customForm" id="myForm">

                        <label>Your Name</label>
                        <input type="text"
                                class="form-control"
                                v-model="post.yourName"
                                placeholder="Please Enter Your Full Name" required />

                        <label>Your Email</label>
                        <input 
                                type="email"
                                class="form-control"
                                v-model="post.yourEmail"
                                placeholder="Please Enter Your Address" required />

                        <label>Subject</label>
                        <input 
                                type="text"
                                class="form-control"
                                name="Subj"
                                v-model="post.yourSubject"
                                placeholder="Please Enter Your Subject" required />
                        
                        <label>Message</label>
                        <textarea 
                                name="Msg"
                                v-model="post.yourMessage"
                                class="form-control"
                                placeholder="Description..."></textarea>
         
                        <button class="btn btnCustom" id="postsubmit" >Submit Data</button>
                    
                    </form>
        </div>
    </section>
</template>

<script>
// import axios from 'axios';
import contactServices from '../../../services/contact/contact'

export default {
    name: 'Contact_Page',
    data() {
        return{
            post: {
                yourName: 'Amoos',
                yourEmail: 'info@me.now',
                yourSubject: 'Welcome',
                yourMessage: 'Something',
            }
        }
    },
     methods : {

        async onSubmit(e) {
            e.preventDefault();

            const emailBody = {
                "yourName": this.post.yourName,
                "yourEmail": this.post.yourEmail,
                "yourSubject": this.post.yourSubject,
                "yourMessage": this.post.yourMessage,
            };

            // 2. Create a FormData object, and append each field to the object
            const form = new FormData();
            for (const field in emailBody) {
                form.append(field, emailBody[field]);
            }


            let resp = await contactServices.sendEmail(6, form)
            
            if ( resp.status == 200 ) {
                this.posts = resp.data;
                console.log("You Logged In: ", resp.data)
            }
    
           }
       },
}
</script>