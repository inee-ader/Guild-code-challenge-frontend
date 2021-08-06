
### Note from Inee Ader: 
- *I formatted this to fit with the iPad dimensions, but it also works on larger screens.*
- *This ReadMe is written in a very conversational style, and I want you to know that I CAN be bullet-point-concise if ever needed. I just wanted to be detailed here.*
- *I have deleted the `node_modules` folders for the sake of .zipping so please grab them again to run the app.*

# Challenges: 
Whew this was a doozy for me! 

- The first challenge was a little confusion over which set of instructions I was to follow...When I asked about the pdfs I was emailed, I received the .zip file with the boilerplate code! I initially coded out a chat-app of my own creative venture before I knew about these .zip files! So I guess I got a pretty cool side-project going during all of this. You can access Chat's So Raven [here](https://github.com/inee-ader/chats-so-raven)!! (I definitely didn't get time to make it mobile responsive, but you'll be pleased with the chat message send feature -- just press `enter`!)

- One of the major challenges, generally speaking, was navigating the codebase and tracing how everything was connected! 

- I'm new to React Hooks, so it was good to get familiar with how poweful they are! I love all the stateless functional components--React Hooks are after my heart! 

- Another challenge I had was the Channel functionality. As you can probably tell, when you click on a channel, it does nothing but give your cursor the pointer style. I saw that the mockup had this option to join a channel but wasn't familiar enough with Socket.io to create a conversation from it. My thinking was that I would just register anyone's `userId` who sent a message in that channel, and allowing every user to access it. 

- An odd thing that I cannot exactly replicate, is that upon refresh, sometimes the code wouldn't retrieve the Conversation messages that were bound to that conversation...I THINK sometimes it switched them, or didn't filter them properly. This may be a Socket.io error or inconsistency in the filtering. It also may have to do with the next issue: 

- If I had a conversation selected, then refreshed the page, it would throw an error about "cannot read property 'emit' of undefined" and I think it loses the conversationId. When I take off the `/conversation/[conversationId]` extension it has no issue going back to the `/` route of "localhost:3000" and letting me click back into the chat. But when I `copy` the extension, refresh, and paste it back in, it cannot find that conversation again. A hacky way of fixing would be to reset path to `/` upon refresh, but ultimately finding the correct conversationId or persisting it through the refresh would be a better solution. 


# More Challenges
### I'm very happy that I was able to get pretty close to the mockup pictures of the modal, chat view, and left panel, but a few things weren't QUITE SO!
- The Material Icon for 'edit' on the New Message button of the left panel was difficult to acquire. This codebase didn't seem to agree with the dependencies to install `@material-ui/core/icons`, so I ended up having to download the .png of the icon, match the color to the swatch provided on Figma, and import that directly into the `NewMessage` directory. 

- For some reason, I couldn't seem to get the `ChatView > MessageList` to take up the full width of the browser window. I think there was some kind of inherited style, or disagreeance among the parent elements. 

- I wasn't sure how to implement the grouping of messages by the same user...My thinking was to track the message `sender` and if the NEXT message is also being sent by the same `sender`from the PREVIOUS message, to hide or disable the username and timestamp. 

- In some cases, it was hard for me to decipher the text styles that were provided in the mockup album. The H1 and H2 features were easy enough to understand. The other two, who both went by "Paragraph large" had slight differences in attribute (not color) that made it confusing for me to pinpoint which was which. Namely, Google Font's Nunito Sans was NAMED differently, and had many font-weights. For example, when designating `Nunito Sans SemiBold` and `Nunito Sans ExtraBold`, there were many more options in the Google Fonts library, and as you can see in the SCSS files, the difference is between `font-family: 'Nunito Sans', sans-serif;` and `font-family: 'Nunito', sans-serif;`, so this was difficult to keep track of. 

- Another challenge was that all the component files had the same title of `index.jsx`...this made it a little confusing to navigate, not being able to IMMEDIATLY now which index.jsx file I was in. I understand that this is a common convention, but my personal preference would be to keep the names of the files the same as the component name (e.g. ChatView.jsx). The same goes for the style file (e.g. ChatView.scss). I did like that the style file was in the same directory as the component it was for though, I personally have been separating the styles from components, but I like this idea. 

- Towards the end of my stopping point tonight, I realized that the `currentUser` is accessed via `localStorage`, and wasn't part of the users that I hard-coded in the App. It was too late to integrate that `currentUser` into the users array and make sure to keep that user separate from the `SelectConversation` component drop down menu. If I had more time between my other responsibilities and striving to look my best for this interview, I would've gone back and added the current user to that users array, and made sure to filter out the appropriate users depending on which component was in use. 

- I'm not sure that I fulfilled the 9 column grid that was suggested in the mockups...


# OPPORTUNITIES FOR IMPROVEMENT
- I would also have liked to add the feature to delete `Direct Messages`, or at least adding a check that the `currentUser` wasn't already in a conversation with the `selectedUser`, to prevent duplicates (with some error handling for the UI). About the former point, I would've researched Socket.io methods and found a way to destroy the `conversationId`/`socketId` for that chat, and then remove it from the list with `setConversations`. 

- I would also have felt more satisfied if I had a check to make sure that the sender wasn't sending an empty message! I believe this would be something to the effect of making sure the message had some content and wasn't blank, before submitting to the conversation as a `Message`. Then some error handling, or at least to disable the submit feature until something was added to the input. 

- I would've LOVED to set a light and dark mode on this chat, because I've been itching to learn about Material UI's `<ThemeProvider />`, so that would be a feature I would've added. 

- I guess I can't blame my bootcamp experience, but I had never come across writing tests before. So unfortunately I didn't know how to write any tests. I started researching test-writing for React components, but I believe I was too late to the test-writing game. I am sorry. 

- It's not P E R F E C T on the iPad view, but that's what I tried to style it for! 

- Also, would be nice to see each user's message in the Direct Message `ChatView` appear staggered or displayed on separate sides, much like a phone text app. And the same would apply for the Channel chat, having the `currentUser` on one side, and all the rest of the users staggered on the other. It needs to have more differentiation between `currentUser` and "the others", so colorized text or usernames would also suffice to create a nice boundary. 

- AAAAAND a user avatar, who doesn't LOVE choosing a personal icon for their messaging account? 

In general, there's a lot of opportunity for improvement, both in the code, and in my skills! The challenges were great, but I learned a lot going through both this boilerplate code, and my own personal creative version too! 


# DECISIONS 
Honestly, I feel that since I'm fresh out of the egg into the Tech field, I don't hold many strong opinions for how code should be written. I'd say I'm mentally nimble and impressionable--able to accept the styles and methods of more experience people, until I develop my own way of coding that is more opinionated. 

Most of my decisions here were driven by the mockup photos, trying to mimic the structure and layout of the words and components to match. 

I'm eager to learn the "right way" to code, or at least several "acceptable" ways, so that I feel more confident that the decisions I make are in accordance and harmony with everyone else! 

# CONCLUSION
Thank you so much for this opportunity! I have learned a lot, and made a funny side-project along with it. I am looking forward to growing my skills and making more projects to enhance human life and human experience. I love design, and I love the styling portion--the frontiest of frontend endeavors! 

I look forward to seeing the Guild campus and meeting all the wonderful people behind this wonderful Mission! 

Enthusiastically, 
Inee Ader
Github: inee-ader
ineeader.dev