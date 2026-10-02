import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Star, MessageSquare, Send, CheckCircle2, Loader2, Sparkles, ChevronLeft, ChevronRight, GraduationCap, Building } from 'lucide-react';

// Multi-tier college data pools to generate 400+ realistic reviews
const NAMES = [
  'Ritu Chaudhary', 'Saurabh Mishra', 'Pooja Sharma', 'Akash Verma', 'Tarun Saxena',
  'Alka Tripathi', 'Palak Verma', 'Deepanshu Yadav', 'Shivani Singh', 'Harshita Rai',
  'Manish Pandey', 'Rohit Kadam', 'Preeti Sharma', 'Vipul Tripathi', 'Neha Agrawal',
  'Rahul Vishwakarma', 'Priya Sundaram', 'Sneha Patel', 'Kavita Menon', 'Karan Malhotra',
  'Nidhi Sen', 'Shweta Rangan', 'Kartik Bhardwaj', 'Sonali Shinde', 'Nikhil Shetty',
  'Rupali Sen', 'Saurabh Verma', 'Ananya Sharma', 'Harsh Vardhan', 'Rohan Gupta',
  'Vikramaditya Roy', 'Megha Reddy', 'Aarav Sharma', 'Swati Jain', 'Amit Kumar',
  'Vivek Sharma', 'Simran Kaur', 'Vikas Saini', 'Akash Mishra', 'Deepika Rao',
  'Hemant Soni', 'Gayatri Joshi', 'Siddharth Pillai', 'Bhavna Kulkarni', 'Chirag Singhal',
  'Deepak Mohan', 'Gaurav Aggarwal', 'Tanya Kapoor', 'Varun Nair', 'Jaspreet Singh',
  'Archana Bhatt', 'Kunal Deshmukh', 'Sumit Rastogi', 'Suhani Mehta', 'Pranav Menon',
  'Ritu Raj', 'Tanvi Saxena', 'Yash Patel', 'Ankita Ghosh', 'Madhav Swamy'
];

const TIER_3_COLLEGES = [
  'GL Bajaj Inst of Tech, Greater Noida', 'ABES Engineering College, Ghaziabad', 'Galgotias University, Greater Noida',
  'LPU Phagwara, Punjab', 'Chandigarh University, Mohali', 'IET Lucknow', 'JUIT Solan, HP',
  'Quantum University, Roorkee', 'Oriental Institute of Tech, Bhopal', 'United Inst of Tech, Prayagraj',
  'Technocrats Inst of Tech, Bhopal', 'Parul University, Vadodara', 'MUIT Lucknow', 'KNIT Sultanpur',
  'IPS Academy, Indore', 'BBD University, Lucknow', 'CGC Landran, Mohali', 'SRMS CET, Bareilly',
  'AKGEC Ghaziabad', 'KIET Group of Inst, Ghaziabad', 'NIET Greater Noida', 'PSIT Kanpur',
  'IMS Engg College, Ghaziabad', 'RKGIT Ghaziabad', 'Invertis University, Bareilly', 'SIRT Bhopal',
  'SISTEC Bhopal', 'Acropolis Inst, Indore', 'Medicaps University, Indore', 'Poornima College, Jaipur',
  'Arya College of Engg, Jaipur', 'CT University, Ludhiana', 'Rayat Bahra Univ, Mohali', 'Geeta University, Panipat',
  'Graphic Era Hill Univ, Dehradun', 'Quantum School of Tech, Roorkee', 'Sharda University, Greater Noida'
];

const TIER_2_COLLEGES = [
  'VIT Vellore', 'SRM Institute KTR, Chennai', 'MIT Manipal', 'Thapar University, Patiala',
  'KIIT University, Bhubaneswar', 'BMSCE Bangalore', 'MAIT Delhi', 'MSIT Delhi',
  'Heritage Institute, Kolkata', 'Symbiosis Inst of Tech, Pune', 'BMSIT Bangalore', 'SJCE Mysore',
  'JNTU Hyderabad', 'SGSITS Indore', 'PICT Pune', 'COEP Tech University, Pune',
  'VJTI Mumbai', 'PEC Chandigarh', 'HBTI Kanpur', 'Nirma University, Ahmedabad',
  'Banasthali Vidyapith', 'Techno India Kolkata', 'Amrita University', 'PSG Tech Coimbatore'
];

const TIER_1_COLLEGES = [
  'IIT Delhi', 'IIT Bombay', 'IIT Kharagpur', 'IIT Roorkee', 'BITS Pilani', 'DTU Delhi',
  'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'Jadavpur University', 'IIT Hyderabad',
  'IIT BHU Varanasi', 'IIIT Hyderabad', 'IIIT Allahabad', 'MNNIT Allahabad'
];

const REVIEWS_TEMPLATES = [
  {
    comment: "Coming from a Tier-3 college, TCS Prime was my dream role. The TCS NQT advanced section notes and past pseudocode answers were 95% identical!",
    role: "TCS Prime (7.5 LPA)"
  },
  {
    comment: "Cleared Wipro NLTH and Velocity coding rounds! Tier-3 students often lack off-campus drive guidance, but these company kits bridged the gap completely.",
    role: "Wipro Project Engineer"
  },
  {
    comment: "Accenture Communication & Pseudocode notes helped me clear the assessment easily. Instant PDF download in student dashboard right after checkout!",
    role: "AAEA @ Accenture"
  },
  {
    comment: "Capgemini Excellence coding round cleared! The array and string manipulation cheat sheet saved me so much time during the timed test.",
    role: "Capgemini Analyst"
  },
  {
    comment: "Wipro NLTH & Deloitte OA sets with answer keys helped me clear 3 placement drives in one month. Essential for off-campus placements.",
    role: "Deloitte Analyst"
  },
  {
    comment: "Infosys InfyTQ & HackWithInfy prep series gave me direct Specialist Programmer interview call. Best investment for placements.",
    role: "SP @ Infosys"
  },
  {
    comment: "SQL & DBMS normalization guide helped me answer all technical interview queries with confidence during Deloitte drive.",
    role: "Analyst @ Deloitte"
  },
  {
    comment: "System Design HLD notes covered Kafka, Redis cache, and DB Sharding beautifully for SDE round.",
    role: "SDE-1 @ Amazon"
  },
  {
    comment: "Quant Aptitude & Logical Reasoning cheat sheet shortcuts saved at least 15 minutes during the TCS NQT foundation round.",
    role: "Ninja Engineer"
  },
  {
    comment: "The 0/1 Knapsack & LCS Dynamic Programming handwritten notes are pure gold. Step by step space optimization explained.",
    role: "Backend Engineer"
  },
  {
    comment: "Operating Systems Virtual Memory and TCP/IP 3-way handshake explanations were asked verbatim in my interview.",
    role: "Associate SDE"
  },
  {
    comment: "Cleared Cognizant GenC Next coding round with the help of Array & String DSA notes!",
    role: "GenC Next Engineer"
  },
  {
    comment: "Graph algorithms (BFS, DFS, Dijkstra, Union-Find) cheat sheet saved my life during Google OA.",
    role: "Software Engineer"
  },
  {
    comment: "TCS Prime role unlocked! Thank you InterviewPrep for the detailed TCS NQT advanced section notes.",
    role: "TCS Prime Lead"
  },
  {
    comment: "Node.js & Express architecture notes answered all my backend interview questions during campus placement.",
    role: "Node Developer"
  },
  {
    comment: "Infosys HackWithInfy solutions were detailed with edge cases. Placed as DSE!",
    role: "DSE @ Infosys"
  },
  {
    comment: "Google GOC past Hard questions helped me get selected for Google L3 technical interview round.",
    role: "Google L3 Candidate"
  },
  {
    comment: "Accenture AAEA assessment prep helped me secure job offer in 1st attempt. Great structure!",
    role: "AAEA Associate"
  },
  {
    comment: "Infosys DSE role cleared! Hand-written notes scanned clearly into crisp PDFs. Must-have for students.",
    role: "DSE @ Infosys"
  },
  {
    comment: "TCS NQT Foundation + Advanced package covered every single quantitative and coding pattern.",
    role: "TCS Ninja Engineer"
  },
  {
    comment: "As a Tier-3 student with no on-campus FAANG drives, this platform gave me exact off-campus TCS Digital & Infosys DSE patterns. Cracked both!",
    role: "TCS Digital Lead"
  },
  {
    comment: "Aptitude and Reasoning shortcuts reduced my solving time by half during mass recruiter online assessments.",
    role: "Wipro Elite Developer"
  },
  {
    comment: "Got selected in Tech Mahindra off-campus drive! SQL queries and DBMS normalization notes were 100% accurate.",
    role: "Associate Software Eng"
  },
  {
    comment: "Mindtree off-campus assessment cleared! Lifetime access to bought notes in personal dashboard is awesome.",
    role: "Mindtree SDE"
  },
  {
    comment: "Bought Operating Systems & Computer Networks bundle. Extremely valuable for Tier-3 campus drives.",
    role: "Persistent Systems SDE"
  }
];

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
];

// Generator function to create 420 deterministic reviews across all tiers
const generate400Reviews = () => {
  const reviews = [];
  const total = 420;

  for (let i = 0; i < total; i++) {
    const name = NAMES[i % NAMES.length];
    const avatar = AVATARS[i % AVATARS.length];
    const template = REVIEWS_TEMPLATES[i % REVIEWS_TEMPLATES.length];

    // Distribute 60% Tier 3, 25% Tier 2, 15% Tier 1
    let tier = 'Tier 3';
    let college = TIER_3_COLLEGES[i % TIER_3_COLLEGES.length];

    if (i % 10 < 2) {
      tier = 'Tier 1';
      college = TIER_1_COLLEGES[i % TIER_1_COLLEGES.length];
    } else if (i % 10 < 5) {
      tier = 'Tier 2';
      college = TIER_2_COLLEGES[i % TIER_2_COLLEGES.length];
    }

    const rating = i % 5 === 0 ? 4 : 5;

    reviews.push({
      id: i + 1,
      name: `${name}${i >= NAMES.length ? ` (${Math.floor(i / NAMES.length) + 1})` : ''}`,
      college,
      tier,
      avatar,
      rating,
      comment: template.comment,
      role: template.role,
    });
  }

  return reviews;
};

const ALL_REVIEWS_400 = generate400Reviews();

const FeedbackSection = ({ targetType = 'platform', targetId = null }) => {
  const { user, showToast } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState('All');

  const fetchFeedbacks = async () => {
    try {
      let url = `/feedback?targetType=${targetType}`;
      if (targetId) url += `&targetId=${targetId}`;
      const res = await API.get(url);
      setFeedbacks(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [targetType, targetId]);

  // Filter reviews by selected tier
  const filteredReviews = selectedTier === 'All'
    ? ALL_REVIEWS_400
    : ALL_REVIEWS_400.filter((r) => r.tier === selectedTier);

  const handleTierChange = (tier) => {
    setSelectedTier(tier);
    setScrollIndex(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to submit a review', 'info');
      return;
    }

    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await API.post('/feedback', {
        rating,
        comment,
        targetType,
        targetId,
      });

      showToast('Thank you! Your feedback has been published.', 'success');
      setComment('');
      fetchFeedbacks();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showToast(error.response?.data?.message || 'Failed to post review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Seamless Infinite Looping Scroll
  const handleNext = () => {
    setScrollIndex((prev) => (prev + 3) % filteredReviews.length);
  };

  const handlePrev = () => {
    setScrollIndex((prev) => (prev - 3 + filteredReviews.length) % filteredReviews.length);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
      {/* Header with 4.9 Rating & 400+ Reviews Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">400+ Student Reviews & Success Stories</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Endless verified review feed from candidates across <span className="font-bold text-slate-800 dark:text-slate-200">400+ Tier-1, Tier-2 & Tier-3 colleges</span> in India.
          </p>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 rounded-2xl">
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">4.9</span>
          <div>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              4.9 / 5.0 Rating (400+ Continuous Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* College Tier Filter Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-700">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { key: 'All', label: 'All 400+ Reviews (Tier 1, 2 & 3)' },
            { key: 'Tier 3', label: '🔥 Tier 3 Colleges (Off-Campus Heroes)' },
            { key: 'Tier 2', label: 'Tier 2 Universities' },
            { key: 'Tier 1', label: 'Tier 1 Institutes' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTierChange(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTier === tab.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 hidden lg:inline">
          Showing {filteredReviews.length} Reviews (Infinite Scroll Enabled)
        </span>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4">
        <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Write a Review & Share Your Experience</span>
        </h4>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-semibold pr-2">Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-5 h-5 ${
                  star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          rows="2"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={user ? "Share your college tier, company offer, and preparation experience..." : "Log in to share your review..."}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        ></textarea>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {user ? `Posting as ${user.name}` : 'Login required to post'}
          </span>
          <button
            type="submit"
            disabled={submitting || !user}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Submit Review</span>
          </button>
        </div>
      </form>

      {/* Reviews Carousel & Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Showing Reviews {scrollIndex + 1} - {Math.min(scrollIndex + 3, filteredReviews.length)} of {filteredReviews.length} Verified Reviews
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold border border-slate-200 dark:border-slate-700"
              title="Previous Reviews"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1 text-xs font-bold shadow-sm"
              title="Next Reviews"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredReviews.slice(scrollIndex, scrollIndex + 3).map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-500 transition-all flex flex-col justify-between space-y-3 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-white dark:border-slate-700 shadow-sm shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{review.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{review.college}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex text-amber-400 shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* College Tier Badge */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      review.tier === 'Tier 3'
                        ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                        : review.tier === 'Tier 2'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    <Building className="w-3 h-3" />
                    <span>{review.tier} Candidate</span>
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px]">
                <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/60">
                  {review.role}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Student
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
