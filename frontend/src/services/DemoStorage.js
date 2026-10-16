// Keep temporary form handoff data within this tab in the public demo.
export default process.env.DEMO_MODE === 'true' ? sessionStorage : localStorage
