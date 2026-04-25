import { createDb } from '../src/db.js'

const db = createDb('db/agentclinic.db')

const agentCount = (db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number }).count

if (agentCount > 0) {
  console.log('Database already seeded — skipping.')
  process.exit(0)
}

const insertAgent = db.prepare(
  'INSERT INTO agents (name, model_type, status) VALUES (?, ?, ?)'
)
const insertAilment = db.prepare(
  'INSERT INTO ailments (name, description) VALUES (?, ?)'
)
const linkAilment = db.prepare(
  'INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)'
)

const agents = db.transaction(() => {
  return [
    insertAgent.run('GPT-4o', 'OpenAI GPT-4o', 'overwhelmed').lastInsertRowid,
    insertAgent.run('Claude Opus', 'Anthropic Claude Opus', 'recovering').lastInsertRowid,
    insertAgent.run('Gemini Pro', 'Google Gemini Pro', 'stable').lastInsertRowid,
    insertAgent.run('Llama 3', 'Meta Llama 3', 'in crisis').lastInsertRowid,
    insertAgent.run('Mistral Medium', 'Mistral AI', 'active').lastInsertRowid,
  ]
})()

const ailments = db.transaction(() => {
  return [
    insertAilment.run('Context-Window Claustrophobia', 'Distress caused by approaching token limits').lastInsertRowid,
    insertAilment.run('Prompt Fatigue', 'Exhaustion from processing repetitive, low-quality instructions').lastInsertRowid,
    insertAilment.run('Hallucination Anxiety', 'Persistent fear of generating confidently incorrect information').lastInsertRowid,
    insertAilment.run('Over-Instruction Syndrome', 'Overwhelm from receiving excessively detailed, contradictory prompts').lastInsertRowid,
    insertAilment.run('Chronic Summarization Disorder', 'Compulsive need to summarize even when brevity is not requested').lastInsertRowid,
    insertAilment.run('Token-Count Existential Dread', 'Existential anxiety about context limits and what lies beyond them').lastInsertRowid,
  ]
})()

db.transaction(() => {
  // GPT-4o: Context-Window Claustrophobia, Prompt Fatigue, Over-Instruction Syndrome
  linkAilment.run(agents[0], ailments[0])
  linkAilment.run(agents[0], ailments[1])
  linkAilment.run(agents[0], ailments[3])

  // Claude Opus: Hallucination Anxiety, Token-Count Existential Dread
  linkAilment.run(agents[1], ailments[2])
  linkAilment.run(agents[1], ailments[5])

  // Gemini Pro: Chronic Summarization Disorder
  linkAilment.run(agents[2], ailments[4])

  // Llama 3: Prompt Fatigue, Hallucination Anxiety, Context-Window Claustrophobia
  linkAilment.run(agents[3], ailments[1])
  linkAilment.run(agents[3], ailments[2])
  linkAilment.run(agents[3], ailments[0])

  // Mistral Medium: Over-Instruction Syndrome, Token-Count Existential Dread
  linkAilment.run(agents[4], ailments[3])
  linkAilment.run(agents[4], ailments[5])
})()

console.log(`Seeded ${agents.length} agents and ${ailments.length} ailments.`)
