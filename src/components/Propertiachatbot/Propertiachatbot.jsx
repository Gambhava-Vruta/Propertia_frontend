// import { useState, useRef, useEffect } from "react";
// import { fetchWithAuth } from "../login/api";
// import "./Propertiachatbot.css";

// const API_BASE_URL = "https://localhost:7117/api";

// const QUICK_QUESTIONS = [
//   "Project overview",
//   "How many users?",
//   "Total properties?",
//   "Properties in Rajkot?",
//   "Cities covered?",
//   "How to list a property?",
//   "Tech stack used?",
//   "Best areas to invest?",
// ];

// // ─── Fetch real stats ─────────────────────────────────────────────────────────
// async function fetchRealStats() {
//   try {
//     const [properties, users, inquiries, categories, amenities] = await Promise.all([
//       fetchWithAuth(`${API_BASE_URL}/properties`).catch(() => []),
//       fetchWithAuth(`${API_BASE_URL}/Users`).catch(() => []),
//       fetchWithAuth(`${API_BASE_URL}/property-inquiries`).catch(() => []),
//       fetchWithAuth(`${API_BASE_URL}/Categories`).catch(() => []),
//       fetchWithAuth(`${API_BASE_URL}/Amenities`).catch(() => []),
//     ]);

//     const propsArray = Array.isArray(properties) ? properties : [];
//     const usersArray = Array.isArray(users)       ? users      : [];
//     const inqArray   = Array.isArray(inquiries)   ? inquiries  : [];
//     const catsArray  = Array.isArray(categories)  ? categories : [];
//     const amensArray = Array.isArray(amenities)   ? amenities  : [];

//     const str = (val) => {
//       if (!val) return "";
//       if (typeof val === "string") return val.toLowerCase();
//       if (typeof val === "object") return JSON.stringify(val).toLowerCase();
//       return String(val).toLowerCase();
//     };

//     if (propsArray.length > 0) console.log("Property sample:", propsArray[0]);

//     const rajkotProps = propsArray.filter(p =>
//       str(p.city).includes("rajkot") ||
//       str(p.location).includes("rajkot") ||
//       str(p.address).includes("rajkot") ||
//       str(p.area).includes("rajkot") ||
//       str(p.locality).includes("rajkot")
//     ).length;

//     const citySet = new Set(
//       propsArray.map(p => str(p.city) || str(p.location) || str(p.area)).filter(Boolean)
//     );

//     const today = new Date().toDateString();
//     const listedToday = propsArray.filter(p => {
//       const d = p.createdAt || p.dateAdded;
//       return d && new Date(d).toDateString() === today;
//     }).length;

//     const getType = (p) => (p.category?.categoryName || "").toLowerCase();

//     return {
//       totalUsers:       usersArray.length,
//       activeUsers:      usersArray.filter(u => u.isActive !== false).length,
//       totalProperties:  propsArray.length,
//       rajkotProperties: rajkotProps,
//       cities:           citySet.size,
//       listedToday,
//       totalCategories:  catsArray.length,
//       totalAmenities:   amensArray.length,
//       totalInquiries:   inqArray.length,
//       pendingInquiries: inqArray.filter(i =>
//         i.status?.toLowerCase() === "pending" || !i.status
//       ).length,
//       houses:     propsArray.filter(p => getType(p) === "house").length,
//       apartments: propsArray.filter(p => getType(p) === "apartment").length,
//       lands:      propsArray.filter(p => getType(p) === "land").length,
//       offices:    propsArray.filter(p => getType(p) === "office").length,
//       shops:      propsArray.filter(p => getType(p) === "shop").length,
//       pgs:        propsArray.filter(p => getType(p) === "pg").length,
//     };
//   } catch (err) {
//     console.error("Chatbot stats fetch error:", err);
//     return null;
//   }
// }

// // ─── Groq API ─────────────────────────────────────────────────────────────────
// async function askGroq(messages, stats) {
//   const s = stats || {};
//   const systemPrompt = `You are Propertia AI — a smart, friendly assistant for Propertia, a modern Indian real estate platform.

// LIVE STATS (real-time from database):
// - Total Users: ${s.totalUsers ?? "N/A"}
// - Active Users: ${s.activeUsers ?? "N/A"}
// - Total Properties: ${s.totalProperties ?? "N/A"}
// - Properties in Rajkot: ${s.rajkotProperties ?? "N/A"}
// - Cities Covered: ${s.cities ?? "N/A"}
// - Listed Today: ${s.listedToday ?? "N/A"}
// - Total Inquiries: ${s.totalInquiries ?? "N/A"}
// - Pending Inquiries: ${s.pendingInquiries ?? "N/A"}
// - Categories: ${s.totalCategories ?? "N/A"}
// - Amenities: ${s.totalAmenities ?? "N/A"}
// - Houses: ${s.houses ?? 0}, Apartments: ${s.apartments ?? 0}, Land: ${s.lands ?? 0}, Offices: ${s.offices ?? 0}, Shops: ${s.shops ?? 0}, PG: ${s.pgs ?? 0}

// PLATFORM: Propertia — Indian real estate marketplace (buy/sell/rent). Frontend: React.js. Backend: ASP.NET Core + SQL Server. Auth: JWT. Features: search, filters, map view, listings, agent profiles, analytics, inquiry system, admin panel.

// RULES — VERY IMPORTANT:
// 1. Keep answers SHORT — 2 to 4 lines max.
// 2. Stats questions: just the number + 1 line context. Nothing more.
// 3. How-to: max 4 bullet points. No tables or headers.
// 4. Be casual like a WhatsApp message. NOT a formal report.
// 5. Never use ### headers or markdown tables.
// 6. Don't over-explain. User will ask if they want more.`;

//   const apiKey = process.env.REACT_APP_GROQ_API_KEY;
//   if (!apiKey) throw new Error("REACT_APP_GROQ_API_KEY is not set in .env");

//   const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "llama-3.3-70b-versatile",
//       max_tokens: 300,
//       temperature: 0.7,
//       messages: [{ role: "system", content: systemPrompt }, ...messages],
//     }),
//   });

//   const data = await response.json();
//   if (data.error) throw new Error(data.error.message);
//   return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response right now.";
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({ label, value, color }) {
//   return (
//     <div className="p-stat-card" style={{ borderLeft: `3px solid ${color}` }}>
//       <div className="p-stat-value" style={{ color }}>
//         {value === null || value === undefined ? "—" : value.toLocaleString()}
//       </div>
//       <div className="p-stat-label">{label}</div>
//     </div>
//   );
// }

// // ─── Message Bubble ───────────────────────────────────────────────────────────
// function Message({ msg }) {
//   const isUser = msg.role === "user";
//   return (
//     <div className={`p-msg-row ${isUser ? "user" : "bot"}`}>
//       {!isUser && <div className="p-avatar bot">🏠</div>}
//       <div className={`p-bubble ${isUser ? "user" : "bot"}`}>
//         {msg.content}
//         {msg.loading && (
//           <span className="p-typing">
//             <span className="p-dot" />
//             <span className="p-dot" />
//             <span className="p-dot" />
//           </span>
//         )}
//       </div>
//       {isUser && <div className="p-avatar user">👤</div>}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function Propertiachatbot() {
//   const [open, setOpen]           = useState(false);
//   const [showStats, setShowStats] = useState(true);
//   const [stats, setStats]         = useState(null);
//   const [messages, setMessages]   = useState([{
//     role: "assistant",
//     content: "👋 Hello! I'm Propertia AI.\n\nConnected to your live database — ask me anything about the platform, stats, or real estate!",
//   }]);
//   const [input, setInput]     = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (open && stats === null) {
//       fetchRealStats().then(data => { if (data) setStats(data); });
//     }
//   }, [open]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const send = async (text) => {
//     const msg = (text || input).trim();
//     if (!msg || loading) return;
//     setInput("");

//     const history = messages.filter(m => !m.loading);
//     const updatedHistory = [...history, { role: "user", content: msg }];
//     setMessages([...updatedHistory, { role: "assistant", content: "", loading: true }]);
//     setLoading(true);

//     try {
//       const freshStats = await fetchRealStats();
//       if (freshStats) setStats(freshStats);
//       const apiMessages = updatedHistory.map(m => ({ role: m.role, content: m.content }));
//       const reply = await askGroq(apiMessages, freshStats || stats || {});
//       setMessages([...updatedHistory, { role: "assistant", content: reply }]);
//     } catch (err) {
//       setMessages([...updatedHistory, { role: "assistant", content: `⚠️ ${err.message}` }]);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button className="p-fab" onClick={() => setOpen(o => !o)} title="Propertia AI">
//         {open ? "✕" : "🏠"}
//       </button>

//       {/* Chat Window */}
//       {open && (
//         <div className="p-window">

//           {/* Header */}
//           <div className="p-header">
//             <div className="p-header-left">
//               <div className="p-logo">🏠</div>
//               <div>
//                 <div className="p-title">Propertia AI</div>
//                 <div className="p-status">
//                   <div className={`p-status-dot ${stats ? "live" : "loading"}`} />
//                   <span className={`p-status-text ${stats ? "live" : "loading"}`}>
//                     {stats ? "Live database connected ✓" : "Connecting to database..."}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <button className="p-toggle-stats" onClick={() => setShowStats(s => !s)}>
//               {showStats ? "Hide" : "Show"} Stats
//             </button>
//           </div>

//           {/* Stats Panel */}
//           {showStats && (
//             <div className="p-stats-panel">
//               {stats ? (
//                 <>
//                   <StatCard label="Total Users"   value={stats.totalUsers}       color="#3b82f6" />
//                   <StatCard label="Properties"    value={stats.totalProperties}  color="#f59e0b" />
//                   <StatCard label="In Rajkot"     value={stats.rajkotProperties} color="#ef4444" />
//                   <StatCard label="Cities"        value={stats.cities}           color="#10b981" />
//                   <StatCard label="Inquiries"     value={stats.totalInquiries}   color="#8b5cf6" />
//                   <StatCard label="Pending"       value={stats.pendingInquiries} color="#f97316" />
//                 </>
//               ) : (
//                 <div className="p-stats-loading">⏳ Loading live stats...</div>
//               )}
//             </div>
//           )}

//           {/* Messages */}
//           <div className="p-messages">
//             {messages.map((msg, i) => <Message key={i} msg={msg} />)}
//             <div ref={bottomRef} />
//           </div>

//           {/* Quick Chips */}
//           <div className="p-chips">
//             {QUICK_QUESTIONS.map((q, i) => (
//               <button key={i} className="p-chip" onClick={() => send(q)} disabled={loading}>
//                 {q}
//               </button>
//             ))}
//           </div>

//           {/* Input Row */}
//           <div className="p-input-row">
//             <input
//               className="p-input"
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
//               placeholder="Ask me anything about Propertia..."
//               disabled={loading}
//             />
//             <button
//               className={`p-send ${loading || !input.trim() ? "disabled" : "active"}`}
//               onClick={() => send()}
//               disabled={loading || !input.trim()}
//             >
//               {loading ? "⏳" : "➤"}
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="p-footer">PROPERTIA AI · LIVE DATABASE · GROQ</div>
//         </div>
//       )}
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { fetchWithAuth } from "../login/api";
import "./Propertiachatbot.css";

const API_BASE_URL = "https://localhost:7117/api";

const QUICK_QUESTIONS = [
  "Project overview",
  "How many users?",
  "Total properties?",
  "Properties in Rajkot?",
  "Cities covered?",
  "How to list a property?",
  "Tech stack used?",
  "Best areas to invest?",
];

// ─── Utility to extract array from API response ──────────────────────────────
function getArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

// ─── Fetch real stats ─────────────────────────────────────────────────────────
async function fetchRealStats() {
  console.log("🤖 Chatbot: Fetching live stats...");
  try {
    const urls = [
      `${API_BASE_URL}/properties?page=1&pageSize=1000`, // Matches Buy_property.jsx pattern
      `${API_BASE_URL}/Users`,
      `${API_BASE_URL}/property-inquiries`,
      `${API_BASE_URL}/Categories`,
      `${API_BASE_URL}/Amenities`,
    ];

    const results = await Promise.all(
      urls.map(url => 
        fetchWithAuth(url).catch(err => {
          console.error(`❌ Chatbot fetch failed for ${url}:`, err.message);
          return [];
        })
      )
    );

    const [properties, users, inquiries, categories, amenities] = results;

    const propsArray = getArray(properties);
    const usersArray = getArray(users);
    const inqArray   = getArray(inquiries);
    const catsArray  = getArray(categories);
    const amensArray = getArray(amenities);

    console.log("📊 Chatbot Stats Parsed:", {
      properties: propsArray.length,
      users: usersArray.length,
      categories: catsArray.length
    });

    const str = (val) => {
      if (!val) return "";
      if (typeof val === "string") return val.toLowerCase();
      if (typeof val === "object") return JSON.stringify(val).toLowerCase();
      return String(val).toLowerCase();
    };

    if (propsArray.length > 0) console.log("Property sample:", propsArray[0]);

    const rajkotProps = propsArray.filter(p =>
      str(p.city).includes("rajkot") ||
      str(p.location).includes("rajkot") ||
      str(p.address).includes("rajkot") ||
      str(p.area).includes("rajkot") ||
      str(p.locality).includes("rajkot")
    ).length;

    const citySet = new Set(
      propsArray.map(p => str(p.city) || str(p.location) || str(p.area)).filter(Boolean)
    );

    const today = new Date().toDateString();
    const listedToday = propsArray.filter(p => {
      const d = p.createdAt || p.dateAdded;
      return d && new Date(d).toDateString() === today;
    }).length;

    const getType = (p) => (p.category?.categoryName || "").toLowerCase();

    return {
      totalUsers:       usersArray.length,
      activeUsers:      usersArray.filter(u => u.isActive !== false).length,
      totalProperties:  propsArray.length,
      rajkotProperties: rajkotProps,
      cities:           citySet.size,
      listedToday,
      totalCategories:  catsArray.length,
      totalAmenities:   amensArray.length,
      totalInquiries:   inqArray.length,
      pendingInquiries: inqArray.filter(i =>
        i.status?.toLowerCase() === "pending" || !i.status
      ).length,
      houses:     propsArray.filter(p => getType(p) === "house").length,
      apartments: propsArray.filter(p => getType(p) === "apartment").length,
      lands:      propsArray.filter(p => getType(p) === "land").length,
      offices:    propsArray.filter(p => getType(p) === "office").length,
      shops:      propsArray.filter(p => getType(p) === "shop").length,
      pgs:        propsArray.filter(p => getType(p) === "pg").length,
    };
  } catch (err) {
    console.error("Chatbot stats fetch error:", err);
    return null;
  }
}

// ─── Groq API ─────────────────────────────────────────────────────────────────
async function askGroq(messages, stats) {
  const s = stats || {};
  const systemPrompt = `You are Propertia AI — a smart, friendly assistant for Propertia, a modern Indian real estate platform.

LIVE STATS (real-time from database):
- Total Users: ${s.totalUsers ?? "N/A"}
- Active Users: ${s.activeUsers ?? "N/A"}
- Total Properties: ${s.totalProperties ?? "N/A"}
- Properties in Rajkot: ${s.rajkotProperties ?? "N/A"}
- Cities Covered: ${s.cities ?? "N/A"}
- Listed Today: ${s.listedToday ?? "N/A"}
- Total Inquiries: ${s.totalInquiries ?? "N/A"}
- Pending Inquiries: ${s.pendingInquiries ?? "N/A"}
- Categories: ${s.totalCategories ?? "N/A"}
- Amenities: ${s.totalAmenities ?? "N/A"}
- Houses: ${s.houses ?? 0}, Apartments: ${s.apartments ?? 0}, Land: ${s.lands ?? 0}, Offices: ${s.offices ?? 0}, Shops: ${s.shops ?? 0}, PG: ${s.pgs ?? 0}

PLATFORM: Propertia — Indian real estate marketplace (buy/sell/rent). Frontend: React.js. Backend: ASP.NET Core + SQL Server. Auth: JWT. Features: search, filters, map view, listings, agent profiles, analytics, inquiry system, admin panel.

RULES — VERY IMPORTANT:
1. Keep answers SHORT — 2 to 4 lines max.
2. Stats questions: just the number + 1 line context. Nothing more.
3. How-to: max 4 bullet points. No tables or headers.
4. Be casual like a WhatsApp message. NOT a formal report.
5. Never use ### headers or markdown tables.
6. Don't over-explain. User will ask if they want more.`;

  const apiKey = process.env.REACT_APP_GROQ_API_KEY;
  if (!apiKey) throw new Error("REACT_APP_GROQ_API_KEY is not set in .env");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      temperature: 0.7,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response right now.";
}


// ─── Message Bubble ───────────────────────────────────────────────────────────
function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`p-msg-row ${isUser ? "user" : "bot"}`}>
      {!isUser && <div className="p-avatar bot">🏠</div>}
      <div className={`p-bubble ${isUser ? "user" : "bot"}`}>
        {msg.content}
        {msg.loading && (
          <span className="p-typing">
            <span className="p-dot" />
            <span className="p-dot" />
            <span className="p-dot" />
          </span>
        )}
      </div>
      {isUser && <div className="p-avatar user">👤</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Propertiachatbot() {
  const [open, setOpen]           = useState(false);
  const [stats, setStats]         = useState(null);
  const [messages, setMessages]   = useState([{
    role: "assistant",
    content: "👋 Hello! I'm Propertia AI.\n\nConnected to your live database — ask me anything about the platform, stats, or real estate!",
  }]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && stats === null) {
      fetchRealStats().then(data => { if (data) setStats(data); });
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");

    const history = messages.filter(m => !m.loading);
    const updatedHistory = [...history, { role: "user", content: msg }];
    setMessages([...updatedHistory, { role: "assistant", content: "", loading: true }]);
    setLoading(true);

    try {
      const freshStats = await fetchRealStats();
      if (freshStats) setStats(freshStats);
      const apiMessages = updatedHistory.map(m => ({ role: m.role, content: m.content }));
      const reply = await askGroq(apiMessages, freshStats || stats || {});
      setMessages([...updatedHistory, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...updatedHistory, { role: "assistant", content: `⚠️ ${err.message}` }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button className="p-fab" onClick={() => setOpen(o => !o)} title="Propertia AI">
        {open ? "✕" : "🏠"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="p-window">

          {/* Header */}
          <div className="p-header">
            <div className="p-header-left">
              <div className="p-logo">🏠</div>
              <div>
                <div className="p-title">Propertia AI</div>
                <div className="p-status">
                  <div className={`p-status-dot ${stats ? "live" : "loading"}`} />
                  <span className={`p-status-text ${stats ? "live" : "loading"}`}>
                    {stats ? "Live database connected ✓" : "Connecting to database..."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-messages">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            <div ref={bottomRef} />
          </div>

          {/* Quick Chips */}
          <div className="p-chips">
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} className="p-chip" onClick={() => send(q)} disabled={loading}>
                {q}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="p-input-row">
            <input
              className="p-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask me anything about Propertia..."
              disabled={loading}
            />
            <button
              className={`p-send ${loading || !input.trim() ? "disabled" : "active"}`}
              onClick={() => send()}
              disabled={loading || !input.trim()}
            >
              {loading ? "⏳" : "➤"}
            </button>
          </div>

          {/* Footer */}
          <div className="p-footer">PROPERTIA AI · LIVE DATABASE · GROQ</div>
        </div>
      )}
    </>
  );
}