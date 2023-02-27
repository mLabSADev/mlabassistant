import React from 'react';
import {ScrollView, VStack} from 'native-base';
import UserBubble from './UserBubble';
import BotBubble from './BotBubble';
import * as BotQuestions from '../Bot/leave.json';
const LeaveForm = () => {
  const [botKey, setBotKey] = React.useState('start');
  const [chats, setChats] = React.useState([]);
  const pushBotChat = () => {
    setChats(prev => [...prev, BotQuestions[botKey]]);
  };
  const pushUserChat = reply => {
    setChats(prev => [...prev, reply]);
  };
  React.useEffect(() => {
    for (const key in BotQuestions) {
      if (BotQuestions[key].type === 'options') {
        // console.log('options');
      } else if (BotQuestions[key].type === 'question') {
        // console.log('question');
      } else {
        // console.log(BotQuestions[key]);
      }
    }

    console.log(BotQuestions[botKey]);
    // pushBotChat();
  }, []);

  return (
    <VStack>
      <ScrollView>
        {chats.map((item, i) => {
          console.log(item);
          return <BotBubble key={i} />;
        })}
        <UserBubble />
      </ScrollView>
    </VStack>
  );
};

export default LeaveForm;
