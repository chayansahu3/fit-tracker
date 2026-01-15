
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const FitAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hi there! I am your FitTracker Assistant. Ask me anything about your fitness journey!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const getMockResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('weight') || q.includes('lose')) return "Consistency is key for weight loss. Focus on a slight calorie deficit and regular strength training to maintain muscle mass.";
    if (q.includes('muscle') || q.includes('gain')) return "To build muscle, ensure you're consuming enough protein (approx 1.6g per kg of bodyweight) and practicing progressive overload in your lifts.";
    if (q.includes('hello') || q.includes('hi')) return "Hello! How can I help you with your workout today?";
    if (q.includes('bmi')) return "BMI is a general indicator based on height and weight. You can see your current BMI calculation on the Home dashboard!";
    return "That's a great question! For specific medical or advanced athletic advice, I recommend consulting with a certified personal trainer or nutritionist.";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = getMockResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-2 p-2 bg-slate-800 border border-slate-700 rounded-2xl">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm px-2 py-1 placeholder:text-slate-500"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-colors active:scale-90"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default FitAI;
