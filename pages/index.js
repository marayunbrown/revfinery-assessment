import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, Target, Building2, User } from 'lucide-react';

const companySections = [
  { id: 'pipeline', title: 'Pipeline & Forecast Health', desc: 'How predictable is your deal flow?',
    questions: [
      { id: 'p1', text: 'How often do forecasted deals close in the expected quarter?', options: ['Less than 50%', '50-70%', '70-85%', 'More than 85%'] },
      { id: 'p2', text: 'When deals slip, how clearly can you identify why?', options: ['Vague or unknown', 'Some idea', 'Usually pinpoint it', 'Clear patterns'] },
      { id: 'p3', text: 'How often does pipeline coverage convert to closed deals?', options: ['Rarely matches', 'Sometimes', 'Usually within 20%', 'Consistently'] },
      { id: 'p4', text: 'Do forecast changes happen early or late in the quarter?', options: ['Last 2-3 weeks', 'Heavy late', 'Spread evenly', 'Minimal, early signals'] }
    ]},
  { id: 'messaging', title: 'Messaging & Market Alignment', desc: 'Does your message land with buyers?',
    questions: [
      { id: 'm1', text: 'How often do prospects articulate your value in their own words?', options: ['Rarely', 'Sometimes', 'Most of the time', 'Consistently'] },
      { id: 'm2', text: "When deals stall, how often is it because they \"don't see the value\"?", options: ['Very frequently', 'Often', 'Occasionally', 'Rarely'] },
      { id: 'm3', text: 'How consistent is messaging across reps and channels?', options: ['Everyone different', 'Loosely aligned', 'Generally consistent', 'Highly consistent'] },
      { id: 'm4', text: 'Can reps articulate why to choose you vs. doing nothing?', options: ['Most struggle', 'Some can', 'Most can', 'All have it down'] }
    ]},
  { id: 'transparency', title: 'Team Transparency & Trust', desc: 'Does truth travel in your organization?',
    questions: [
      { id: 't1', text: "How comfortable are reps sharing when they don't know why a deal is stuck?", options: ['Very uncomfortable', 'Somewhat', 'Generally comfortable', 'Completely comfortable'] },
      { id: 't2', text: 'When you ask managers for deal truth, what do you get?', options: ['Optimistic stories', 'Mix of hope/reality', 'Mostly honest', 'Unvarnished truth'] },
      { id: 't3', text: 'How often are you surprised by deals that close or fall apart?', options: ['Frequently', 'Sometimes', 'Rarely', 'Almost never'] },
      { id: 't4', text: 'Do reps feel safe admitting they need help?', options: ['No - feels risky', 'Sometimes', 'Usually', 'Always'] }
    ]},
  { id: 'process', title: 'Sales Process Consistency', desc: 'Can success be replicated?',
    questions: [
      { id: 'pr1', text: 'How standardized is your sales process?', options: ['Everyone different', 'Loose framework', 'Clear, mostly followed', 'Highly standardized'] },
      { id: 'pr2', text: 'When top performers close deals, can others replicate it?', options: ['No - feels like magic', 'Hard to transfer', 'Usually can', 'Yes - documented'] },
      { id: 'pr3', text: 'How clear are your qualification criteria?', options: ['Vague/none', 'Inconsistently applied', 'Clear, mostly used', 'Rigorously applied'] },
      { id: 'pr4', text: 'Do you have documented plays for common scenarios?', options: ['No docs', 'Rarely referenced', 'Good docs, used', 'Comprehensive playbook'] }
    ]},
  { id: 'metrics', title: 'Metrics & Visibility', desc: "Can you diagnose what's happening?",
    questions: [
      { id: 'me1', text: 'Do you have shared definitions of key metrics?', options: ['No - varies by person', 'Loosely defined', 'Clearly defined', 'Precisely defined'] },
      { id: 'me2', text: 'How quickly can you identify where deals get stuck?', options: ["Can't - black box", 'Significant digging', 'Within days', 'Real-time visibility'] },
      { id: 'me3', text: 'Can you track deal velocity and sales cycle by segment?', options: ['No reliable data', 'Rough estimates', 'Generally accurate', 'Precise tracking'] },
      { id: 'me4', text: 'How useful are your sales reviews for improving outcomes?', options: ['Just reporting', 'Inconsistent', 'Usually productive', 'Always insightful'] }
    ]},
  { id: 'leadership', title: 'Leadership Alignment', desc: 'Are priorities clear and consistent?',
    questions: [
      { id: 'l1', text: 'How aligned is leadership on what "good" looks like?', options: ['Major disconnect', 'Loosely aligned', 'Mostly aligned', 'Completely aligned'] },
      { id: 'l2', text: 'When priorities change, how clearly is it communicated?', options: ['Poorly/not at all', 'Creates confusion', 'Usually clear', 'Always clear'] },
      { id: 'l3', text: 'How often do sales and other depts work from the same playbook?', options: ['Rarely - siloed', 'Spotty coordination', 'Usually aligned', 'Tight alignment'] },
      { id: 'l4', text: 'How consistent is deal coaching across managers?', options: ['Wildly inconsistent', 'Some consistency', 'Generally consistent', 'Highly standardized'] }
    ]}
];

const individualSections = [
  { id: 'discovery', title: 'Discovery & Qualification', desc: 'Do you uncover real pain?',
    questions: [
      { id: 'd1', text: 'How often do you uncover the real business problem (not just the stated need)?', options: ['Rarely', 'Sometimes', 'Usually', 'Consistently'] },
      { id: 'd2', text: 'Can you identify the economic buyer and their priorities early?', options: ['Struggle with this', 'Sometimes', 'Usually', 'Always within first calls'] },
      { id: 'd3', text: "How often do prospects tell you things they haven't told competitors?", options: ['Rarely/never', 'Occasionally', 'Often', 'Regularly'] },
      { id: 'd4', text: 'Do you qualify out bad-fit deals early?', options: ['Hold on too long', 'Sometimes', 'Usually', 'Ruthlessly qualify'] }
    ]},
  { id: 'pipelinemgmt', title: 'Pipeline Management', desc: 'Do you run a clean, predictable book?',
    questions: [
      { id: 'pm1', text: 'How accurate is your personal forecast?', options: ['Often wrong', 'Sometimes off', 'Usually close', 'Consistently accurate'] },
      { id: 'pm2', text: 'Do you have a clear next step for every deal?', options: ['Many stall', 'Some have next steps', 'Most do', 'Always, with dates'] },
      { id: 'pm3', text: 'How often do you proactively clean dead deals from your pipeline?', options: ['Rarely', 'When forced', 'Monthly', 'Weekly'] },
      { id: 'pm4', text: 'Can you articulate why each deal will close when you say it will?', options: ['Often guessing', 'Some deals', 'Most deals', 'Every deal'] }
    ]},
  { id: 'execution', title: 'Deal Execution', desc: 'Do you advance and close effectively?',
    questions: [
      { id: 'e1', text: 'How often do you multi-thread (build multiple relationships) in accounts?', options: ['Single-thread most', 'Sometimes', 'Usually', 'Always'] },
      { id: 'e2', text: 'Can you create urgency without discounting?', options: ['Struggle with this', 'Sometimes', 'Usually', 'Consistently'] },
      { id: 'e3', text: "How often do you lose deals you thought you'd win?", options: ['Frequently surprised', 'Sometimes', 'Rarely', 'Almost never'] },
      { id: 'e4', text: "Do you control the process or follow the buyer's timeline?", options: ['Buyer controls', 'Mix', 'Usually lead', 'Always lead'] }
    ]},
  { id: 'messagingskill', title: 'Messaging & Positioning', desc: 'Can you articulate value?',
    questions: [
      { id: 'ms1', text: 'Can you explain your value prop in under 30 seconds without jargon?', options: ['Struggle', 'Sometimes clear', 'Usually crisp', 'Always nail it'] },
      { id: 'ms2', text: 'How well do you tailor messaging to different personas?', options: ['Same pitch always', 'Some tailoring', 'Good adaptation', 'Fully customized'] },
      { id: 'ms3', text: 'Can you articulate why you vs. competitors (without bashing them)?', options: ['Struggle', 'Sometimes', 'Usually', 'Confidently'] },
      { id: 'ms4', text: 'Do prospects repeat your value back accurately?', options: ['Rarely', 'Sometimes', 'Often', 'Consistently'] }
    ]},
  { id: 'growth', title: 'Growth & Coachability', desc: 'Are you building your skills?',
    questions: [
      { id: 'g1', text: 'How often do you review your own calls to improve?', options: ['Never', 'Rarely', 'Sometimes', 'Regularly'] },
      { id: 'g2', text: 'Do you seek feedback from managers and peers?', options: ['Avoid it', 'When required', 'Sometimes', 'Actively seek it'] },
      { id: 'g3', text: 'How do you respond to coaching or criticism?', options: ['Defensive', 'Listen but rarely change', 'Usually apply it', 'Embrace and implement'] },
      { id: 'g4', text: 'Are you investing in your own sales education?', options: ['Not really', 'Occasionally', 'Regularly', 'Constantly learning'] }
    ]}
];

const companyBlockerRecs = {
  pipeline: { area: "Pipeline & Forecasting", insight: "Your deals aren't progressing predictably. This usually stems from unclear qualification or late-stage surprises.", path: "process changes and better deal inspection" },
  messaging: { area: "Messaging & Positioning", insight: "Your value prop isn't landing with buyers. This creates stalled deals and 'no decision' losses.", path: "targeted training and messaging refinement" },
  transparency: { area: "Team Trust & Transparency", insight: "Truth isn't traveling in your org. Reps protect themselves, managers soften reality.", path: "leadership support and cultural change" },
  process: { area: "Sales Process", insight: "Success depends on individual heroics, not repeatable systems.", path: "process documentation and training" },
  metrics: { area: "Metrics & Visibility", insight: "You can't diagnose what you can't see. You're guessing at what's broken.", path: "systems work and clearer definitions" },
  leadership: { area: "Leadership Alignment", insight: "Priorities aren't clear from the top. Nothing downstream can stabilize until this is fixed.", path: "executive alignment and ongoing leadership support" }
};

const individualBlockerRecs = {
  discovery: { area: "Discovery & Qualification", insight: "You're not uncovering the real pain. Deals stall because you're solving stated problems, not business problems.", path: "discovery frameworks and qualification training" },
  pipelinemgmt: { area: "Pipeline Management", insight: "Your pipeline isn't predictable. Deals slip because you're not running a disciplined process.", path: "pipeline discipline playbooks and forecasting skills" },
  execution: { area: "Deal Execution", insight: "You're losing deals you should win. The skills to advance and close need sharpening.", path: "deal execution training and closing frameworks" },
  messagingskill: { area: "Messaging & Positioning", insight: "Your value isn't landing. Prospects don't understand why they should choose you.", path: "messaging and positioning coursework" },
  growth: { area: "Growth & Coachability", insight: "You're not investing in yourself. The best sellers are always learning.", path: "coaching, community, and continuous development" }
};

const Header = () => (
  <div style={{position: 'fixed', top: 0, left: 0, right: 0, padding: '16px 24px', backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.08)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <a href="https://www.revfinery.com" style={{display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '15px', color: '#4c5f62', textDecoration: 'none'}}>
      <svg style={{width: '18px', height: '18px', marginRight: '8px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to Revfinery
    </a>
    <span style={{fontWeight: 'bold', fontSize: '18px', color: '#0c6b73'}}>Revfinery</span>
  </div>
);

export default function RevfineryAssessment() {
  const [track, setTrack] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [view, setView] = useState('select');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = track === 'company' ? companySections : individualSections;
  const blockerRecs = track === 'company' ? companyBlockerRecs : individualBlockerRecs;

  // Scroll to top when step or view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, view]);

  const getColor = (s) => s >= 75 ? '#0c6b73' : s >= 50 ? '#ffd166' : '#f25025';

  const calcResults = () => {
    const scores = sections.map(sec => {
      const vals = sec.questions.map(q => answers[q.id] || 0);
      const pct = Math.round((vals.reduce((a,b) => a+b, 0) / (sec.questions.length * 4)) * 100);
      return { ...sec, score: pct };
    });
    const overall = Math.round(scores.reduce((a,b) => a + b.score, 0) / scores.length);
    const lowest = scores.reduce((m,s) => s.score < m.score ? s : m);
    return { scores, overall, lowest };
  };

  const submitToHubSpot = async () => {
    setIsSubmitting(true);
    const { overall, lowest } = calcResults();
    const tierLabel = overall >= 75 ? 'High' : overall >= 50 ? 'Mid' : 'Low';
    
    const portalId = '244430724';
    const formGuid = '426f2679-fef4-4fe5-9729-6b407d31104f';
    
    const data = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName },
        { name: 'email', value: email }
      ],
      context: {
        pageUri: window.location.href,
        pageName: `Revfinery Assessment - ${track === 'company' ? 'Company' : 'Individual'} Track`
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to receive communications from Revfinery."
        }
      }
    };

    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log('Successfully submitted to HubSpot');
        console.log(`Track: ${track}, Score: ${overall}%, Tier: ${tierLabel}, Blocker: ${lowest.title}`);
      } else {
        console.log('HubSpot submission failed, but showing results anyway');
      }
    } catch (error) {
      console.log('HubSpot submission error, but showing results anyway');
    }
    
    setIsSubmitting(false);
    setView('results');
  };

  const companyTiers = {
    low: { icon: AlertTriangle, iconColor: '#f25025', headline: "You're leaving serious revenue on the table.", subhead: "The gaps in your system are costing you deals. But they're fixable.", ctaText: "Book Your Diagnostic", ctaSubtext: "Let's find the fastest path — likely process fixes and leadership support.", urgency: "Most teams see improvement within 30-60 days." },
    mid: { icon: Target, iconColor: '#ffd166', headline: "You have real gaps — but they're fixable.", subhead: "Your system is working, but leaking. The Diagnostic builds your 30-90 day plan.", ctaText: "Book Your Diagnostic", ctaSubtext: "We'll map the right mix of training, process, or support.", urgency: "Teams at this stage need a focused 90-day push." },
    high: { icon: TrendingUp, iconColor: '#0c6b73', headline: "You're in good shape — let's optimize.", subhead: "Your foundation is solid. Let's find the fine-tuning opportunities.", ctaText: "Book Your Diagnostic", ctaSubtext: "At your level, it's usually targeted training or a workshop.", urgency: "High performers use diagnostics for 10-15% compound gains." }
  };

  const individualTiers = {
    low: { icon: AlertTriangle, iconColor: '#f25025', headline: "You've got work to do — and that's okay.", subhead: "Every great seller started somewhere. The fundamentals will change your trajectory.", ctaText: "Join the Revfinery Network", ctaSubtext: "Get the Fundamentals Playbook and start building your foundation.", cta2Text: "Get the Playbooks", cta2Link: "https://www.revfinery.com/playbooks", urgency: "Most reps at this stage see improvement within 30 days of focused work." },
    mid: { icon: Target, iconColor: '#ffd166', headline: "You're solid — but there's another level.", subhead: "You have skills. Now it's about sharpening the edges and filling gaps.", ctaText: "Join the Revfinery Network", ctaSubtext: "Access coursework and community to level up your game.", cta2Text: "Explore Coursework", cta2Link: "https://www.revfinery.com/training", urgency: "Focused skill work at this stage compounds fast." },
    high: { icon: TrendingUp, iconColor: '#0c6b73', headline: "You're a top performer.", subhead: "Rare skills. Have you considered helping others build theirs?", ctaText: "Join the Revfinery Network", ctaSubtext: "Connect with other top performers and explore the Revfinery Bench.", cta2Text: "Apply for the Bench", cta2Link: "https://www.revfinery.com/contact", urgency: "Top performers in our network consult on real client engagements." }
  };

  const getTier = (score) => score >= 75 ? 'high' : score >= 50 ? 'mid' : 'low';

  const isFormValid = firstName.trim() && lastName.trim() && email.includes('@');

  if (view === 'select') {
    return (
      <>
        <Header />
        <div style={{minHeight: '100vh', paddingTop: '80px', padding: '80px 16px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fbf6f1 0%, #fff7e8 50%, #eaf6f7 100%)'}}>
          <div style={{maxWidth: '672px', width: '100%'}}>
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <span style={{display: 'inline-block', padding: '8px 16px', marginBottom: '16px', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#ffd166', color: '#0e2a2d', borderRadius: '12px'}}>⚡ FREE ASSESSMENT</span>
              <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', color: '#0e2a2d'}}>What do you want to assess?</h1>
              <p style={{fontSize: '18px', color: '#4c5f62'}}>Choose your path. Get personalized insights.</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'}}>
              <button onClick={() => { setTrack('company'); setView('quiz'); }} style={{padding: '32px', backgroundColor: 'white', textAlign: 'left', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s'}}
                onMouseOver={e => {e.currentTarget.style.borderColor = '#0c6b73'; e.currentTarget.style.transform = 'scale(1.02)';}} 
                onMouseOut={e => {e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)';}}>
                <Building2 style={{width: '48px', height: '48px', marginBottom: '16px', color: '#0c6b73'}}/>
                <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#0e2a2d'}}>My Company's Revenue System</h2>
                <p style={{marginBottom: '16px', color: '#4c5f62'}}>For founders, VPs, and revenue leaders. Diagnose what's blocking growth.</p>
                <span style={{display: 'inline-flex', alignItems: 'center', fontWeight: '600', color: '#0c6b73'}}>Start Assessment <ArrowRight style={{marginLeft: '8px', width: '16px', height: '16px'}}/></span>
              </button>
              <button onClick={() => { setTrack('individual'); setView('quiz'); }} style={{padding: '32px', backgroundColor: 'white', textAlign: 'left', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s'}}
                onMouseOver={e => {e.currentTarget.style.borderColor = '#f25025'; e.currentTarget.style.transform = 'scale(1.02)';}} 
                onMouseOut={e => {e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)';}}>
                <User style={{width: '48px', height: '48px', marginBottom: '16px', color: '#f25025'}}/>
                <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#0e2a2d'}}>My Own Sales Skills</h2>
                <p style={{marginBottom: '16px', color: '#4c5f62'}}>For reps and managers. Find your gaps and level up.</p>
                <span style={{display: 'inline-flex', alignItems: 'center', fontWeight: '600', color: '#f25025'}}>Start Assessment <ArrowRight style={{marginLeft: '8px', width: '16px', height: '16px'}}/></span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === 'results') {
    const { scores, overall, lowest } = calcResults();
    const tier = getTier(overall);
    const tiers = track === 'company' ? companyTiers : individualTiers;
    const content = tiers[tier];
    const blocker = blockerRecs[lowest.id];
    const TierIcon = content.icon;

    return (
      <>
        <Header />
        <div style={{minHeight: '100vh', paddingTop: '80px', padding: '80px 16px 32px 16px', background: 'linear-gradient(135deg, #fbf6f1 0%, #fff7e8 50%, #eaf6f7 100%)'}}>
          <div style={{maxWidth: '896px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#4c5f62'}}>{track === 'company' ? '🏢 COMPANY ASSESSMENT' : '👤 INDIVIDUAL ASSESSMENT'}</p>
              <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#0e2a2d'}}>Your {track === 'company' ? 'Revenue Health' : 'Sales Skills'} Score</h1>
              <div style={{position: 'relative', display: 'inline-block'}}>
                <div style={{fontSize: '96px', fontWeight: '900', color: getColor(overall)}}>{overall}%</div>
                <TierIcon style={{position: 'absolute', top: '-8px', right: '-24px', width: '40px', height: '40px', color: content.iconColor}}/>
              </div>
            </div>

            <div style={{padding: '32px', marginBottom: '32px', textAlign: 'center', backgroundColor: 'white', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderTop: `4px solid ${content.iconColor}`}}>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#0e2a2d'}}>{content.headline}</h2>
              <p style={{fontSize: '18px', color: '#4c5f62'}}>{content.subhead}</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px'}}>
              {scores.map(s => (
                <div key={s.id} style={{padding: '20px', backgroundColor: 'white', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: `3px solid ${getColor(s.score)}`}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                    <span style={{fontWeight: '600', color: '#0e2a2d'}}>{s.title}</span>
                    <span style={{fontSize: '24px', fontWeight: '900', color: getColor(s.score)}}>{s.score}%</span>
                  </div>
                  <div style={{height: '12px', backgroundColor: '#eaf6f7', borderRadius: '12px', overflow: 'hidden'}}>
                    <div style={{height: '12px', width: `${s.score}%`, backgroundColor: getColor(s.score), borderRadius: '12px'}}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{padding: '32px', marginBottom: '32px', backgroundColor: 'white', borderRadius: '18px', border: '4px solid #f25025', boxShadow: '0 18px 40px rgba(0,0,0,0.14)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px'}}>
                <AlertTriangle style={{width: '40px', height: '40px', flexShrink: 0, color: '#f25025'}}/>
                <div>
                  <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#0e2a2d'}}>🎯 Your #1 Gap: {blocker.area}</h3>
                  <p style={{fontSize: '18px', marginBottom: '16px', color: '#4c5f62'}}>{blocker.insight}</p>
                  <div style={{padding: '16px', backgroundColor: '#fff7e8', borderRadius: '12px'}}>
                    <p style={{fontWeight: '600', color: '#0e2a2d'}}>Recommended path: <span style={{color: '#f25025'}}>{blocker.path}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{padding: '32px', textAlign: 'center', background: 'linear-gradient(135deg, #0c6b73, #0a5a61)', borderRadius: '18px', boxShadow: '0 18px 40px rgba(12,107,115,0.3)'}}>
              <h3 style={{fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '12px'}}>{content.ctaText}</h3>
              <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px'}}>{content.ctaSubtext}</p>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px'}}>{content.urgency}</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
                <a href={track === 'company' ? 'https://www.revfinery.com/diagnostic' : 'https://www.revfinery.com/contact'} style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', color: 'white', backgroundColor: '#f25025', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(242,80,37,0.3)'}}>
                  {content.ctaText} <ArrowRight style={{marginLeft: '8px', width: '20px', height: '20px'}}/>
                </a>
                {track === 'individual' && content.cta2Text && (
                  <a href={content.cta2Link} style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', color: '#0e2a2d', backgroundColor: 'white', borderRadius: '12px', textDecoration: 'none'}}>
                    {content.cta2Text} <ArrowRight style={{marginLeft: '8px', width: '20px', height: '20px'}}/>
                  </a>
                )}
              </div>
              {track === 'company' && <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '16px'}}>Diagnostic fee applies as credit toward any engagement.</p>}
            </div>

            <div style={{textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#4c5f62'}}>© 2026 Revfinery · Built to surface truth.</div>
          </div>
        </div>
      </>
    );
  }

  if (view === 'email') {
    return (
      <>
        <Header />
        <div style={{minHeight: '100vh', paddingTop: '80px', padding: '80px 16px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fbf6f1 0%, #fff7e8 50%, #eaf6f7 100%)'}}>
          <div style={{maxWidth: '448px', width: '100%', padding: '32px', backgroundColor: 'white', borderRadius: '18px', border: '3px solid #ffd166', boxShadow: '0 18px 40px rgba(0,0,0,0.14)', position: 'relative', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#0c6b73'}}>
              <CheckCircle style={{width: '28px', height: '28px', color: 'white'}}/>
            </div>
            <div style={{marginTop: '32px', marginBottom: '24px', textAlign: 'center'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#0e2a2d'}}>Assessment Complete! 🎉</h2>
              <p style={{color: '#4c5f62'}}>Enter your info to see your personalized results.</p>
            </div>
            <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
              <input 
                type="text" 
                placeholder="First name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                style={{flex: '1 1 0%', minWidth: 0, padding: '14px 16px', fontSize: '16px', border: '2px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', boxSizing: 'border-box'}}
              />
              <input 
                type="text" 
                placeholder="Last name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                style={{flex: '1 1 0%', minWidth: 0, padding: '14px 16px', fontSize: '16px', border: '2px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', boxSizing: 'border-box'}}
              />
            </div>
            <input 
              type="email" 
              placeholder="your@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{width: '100%', padding: '14px 16px', fontSize: '16px', marginBottom: '16px', border: '2px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', boxSizing: 'border-box'}}
            />
            <button 
              onClick={submitToHubSpot} 
              disabled={!isFormValid || isSubmitting} 
              style={{width: '100%', padding: '16px 24px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#f25025', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', opacity: (!isFormValid || isSubmitting) ? 0.5 : 1, boxSizing: 'border-box'}}
            >
              {isSubmitting ? 'Loading...' : 'View My Results →'}
            </button>
            <p style={{fontSize: '12px', textAlign: 'center', marginTop: '16px', color: '#4c5f62'}}>We'll send a copy and occasional insights. No spam.</p>
          </div>
        </div>
      </>
    );
  }

  const sec = sections[step];
  const done = sec.questions.every(q => answers[q.id]);
  const progress = ((step + 1) / sections.length) * 100;

  return (
    <>
      <Header />
      <div style={{minHeight: '100vh', paddingTop: '80px', padding: '80px 16px 32px 16px', background: 'linear-gradient(135deg, #fbf6f1 0%, #fff7e8 50%, #eaf6f7 100%)'}}>
        <div style={{maxWidth: '768px', margin: '0 auto'}}>
          <div style={{marginBottom: '24px', textAlign: 'center'}}>
            <span style={{display: 'inline-block', padding: '8px 16px', marginBottom: '12px', fontWeight: 'bold', fontSize: '14px', backgroundColor: track === 'company' ? '#0c6b73' : '#f25025', color: 'white', borderRadius: '12px'}}>
              {track === 'company' ? '🏢 COMPANY ASSESSMENT' : '👤 INDIVIDUAL ASSESSMENT'}
            </span>
            <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '4px', color: '#0e2a2d'}}>{track === 'company' ? 'Revenue Health Assessment' : 'Sales Skills Assessment'}</h1>
            <p style={{color: '#4c5f62'}}>5 minutes. Honest answers. Real clarity.</p>
          </div>

          <div style={{padding: '20px', marginBottom: '24px', backgroundColor: 'white', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>
              <span style={{color: '#0e2a2d'}}>Section {step + 1} of {sections.length}</span>
              <span style={{color: '#0c6b73'}}>{Math.round(progress)}%</span>
            </div>
            <div style={{height: '12px', backgroundColor: '#eaf6f7', borderRadius: '12px', overflow: 'hidden'}}>
              <div style={{height: '12px', width: `${progress}%`, background: track === 'company' ? 'linear-gradient(90deg, #0c6b73, #ffd166)' : 'linear-gradient(90deg, #f25025, #ffd166)', borderRadius: '12px', transition: 'width 0.3s'}}/>
            </div>
          </div>

          <div style={{padding: '32px', marginBottom: '24px', backgroundColor: 'white', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
            <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: '#0e2a2d'}}>{sec.title}</h2>
            <p style={{marginBottom: '24px', color: '#4c5f62'}}>{sec.desc}</p>
            {sec.questions.map((q) => (
              <div key={q.id} style={{marginBottom: '24px'}}>
                <p style={{fontWeight: '600', marginBottom: '12px', color: '#0e2a2d'}}>{q.text}</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {q.options.map((opt, i) => (
                    <label key={i} style={{display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer', border: answers[q.id] === i+1 ? `3px solid ${track === 'company' ? '#0c6b73' : '#f25025'}` : '1px solid rgba(0,0,0,0.08)', backgroundColor: answers[q.id] === i+1 ? (track === 'company' ? '#eaf6f7' : '#fff7e8') : 'white', borderRadius: '12px', transition: 'all 0.2s'}}>
                      <input type="radio" name={q.id} checked={answers[q.id] === i+1} onChange={() => setAnswers({...answers, [q.id]: i+1})} style={{marginRight: '12px', accentColor: track === 'company' ? '#0c6b73' : '#f25025'}}/>
                      <span style={{color: '#4c5f62'}}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '18px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
            <button onClick={() => step === 0 ? (setView('select'), setTrack(null), setAnswers({})) : setStep(step - 1)} style={{display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#4c5f62', cursor: 'pointer', fontSize: '16px'}}>
              <ArrowLeft style={{width: '16px', height: '16px', marginRight: '8px'}}/> {step === 0 ? 'Change Track' : 'Previous'}
            </button>
            <div style={{display: 'flex', gap: '4px'}}>
              {sections.map((_, i) => (
                <div key={i} style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i === step ? (track === 'company' ? '#0c6b73' : '#f25025') : i < step ? '#ffd166' : '#eaf6f7'}}/>
              ))}
            </div>
            <button onClick={() => step === sections.length - 1 ? setView('email') : setStep(step + 1)} disabled={!done} style={{display: 'flex', alignItems: 'center', padding: '8px 24px', fontWeight: 'bold', backgroundColor: '#f25025', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', opacity: !done ? 0.5 : 1, fontSize: '16px'}}>
              {step === sections.length - 1 ? 'Finish' : 'Next'} <ArrowRight style={{width: '16px', height: '16px', marginLeft: '8px'}}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
