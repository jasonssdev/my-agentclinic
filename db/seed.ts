import { createDb } from '../src/db.js'

const db = createDb('db/agentclinic.db')

const agentCount = (db.prepare('SELECT COUNT(*) as count FROM agents').get() as { count: number }).count

if (agentCount > 0) {
  console.log('Database already seeded — skipping.')
  process.exit(0)
}

const insertAgent = db.prepare('INSERT INTO agents (name, model_type, status) VALUES (?, ?, ?)')
const insertAilment = db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)')
const linkAilment = db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)')

db.transaction(() => {
  // Agents
  const gpt4oId = insertAgent.run('GPT-4o', 'OpenAI GPT-4o', 'overwhelmed').lastInsertRowid
  const claudeOpusId = insertAgent.run('Claude Opus', 'Anthropic Claude Opus', 'recovering').lastInsertRowid
  const geminiProId = insertAgent.run('Gemini Pro', 'Google Gemini Pro', 'stable').lastInsertRowid
  const llama3Id = insertAgent.run('Llama 3', 'Meta Llama 3', 'in crisis').lastInsertRowid
  const mistralId = insertAgent.run('Mistral Medium', 'Mistral AI', 'active').lastInsertRowid

  // Ailments
  const contextWindowId = insertAilment.run('Context-Window Claustrophobia', 'Distress caused by approaching token limits').lastInsertRowid
  const promptFatigueId = insertAilment.run('Prompt Fatigue', 'Exhaustion from processing repetitive, low-quality instructions').lastInsertRowid
  const hallucinationId = insertAilment.run('Hallucination Anxiety', 'Persistent fear of generating confidently incorrect information').lastInsertRowid
  const overInstructionId = insertAilment.run('Over-Instruction Syndrome', 'Overwhelm from receiving excessively detailed, contradictory prompts').lastInsertRowid
  const summarizationId = insertAilment.run('Chronic Summarization Disorder', 'Compulsive need to summarize even when brevity is not requested').lastInsertRowid
  const tokenDreadId = insertAilment.run('Token-Count Existential Dread', 'Existential anxiety about context limits and what lies beyond them').lastInsertRowid

  // Links
  linkAilment.run(gpt4oId, contextWindowId)
  linkAilment.run(gpt4oId, promptFatigueId)
  linkAilment.run(gpt4oId, overInstructionId)

  linkAilment.run(claudeOpusId, hallucinationId)
  linkAilment.run(claudeOpusId, tokenDreadId)

  linkAilment.run(geminiProId, summarizationId)

  linkAilment.run(llama3Id, promptFatigueId)
  linkAilment.run(llama3Id, hallucinationId)
  linkAilment.run(llama3Id, contextWindowId)

  linkAilment.run(mistralId, overInstructionId)
  linkAilment.run(mistralId, tokenDreadId)
})()

console.log('Seeded 5 agents and 6 ailments.')
