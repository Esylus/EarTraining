import { Component, OnInit } from '@angular/core';
import {SendMsgService} from '../../services/send-msg.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  message: string;


  constructor(private sendMsgService: SendMsgService) { }

  ngOnInit() {
  }


  messageSubmit(){
    const message = 
    {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    }    
    console.log(message);

    this.sendMsgService.sendMessage(message).subscribe(data =>{
      if(data.success){
        console.log('Message sent - Thanks');
        window.location.reload();
      } else {
        console.log('There was an error');
      }
    });

  }

}
