Travel Board
A public information radiator to be installed in Malls to advise travellers if they should wait before travelling

Decisions
 single static page
 hosted on github pages
 accesses API directly
 requires a highly responsive design
 takes a list of traffic boards, combines their information and dedups
 don't refresh page
 use jquery, everyone here is familiar with it
 deploy target matters a lot less because of jquery

 pros
 simple, fast, easy to write, easy to deliver, more reliable, more secure than a server-side solution
 can add a server in the future if necessary

 cons
 History would be shorter, but we'd only have to wait 5 minutes before we had two values for a trend
