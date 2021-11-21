import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profileUrl = 'https://firebasestorage.googleapis.com/v0/b/complabs-572ad.appspot.com/o/ryan.jpeg?alt=media&token=0aa172c5-8426-4f6b-a7b1-b56bedb226f1'
  h1Message = '💻 Ryan Collicutt | Full Stack Web Developer 💻'
  message = 'Hello! I am a full stack developer from the University of BCIT. I enjoy making web-apps and building services and assemblies from code. Check out some of my other projects at the links below ⬇️'
  constructor() { }

  ngOnInit(): void {
  }

}
