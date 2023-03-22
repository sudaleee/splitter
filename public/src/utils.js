export const runScript = (execSync, script, param1, param2) => {
  try {
    execSync(`osascript ${script} ${param1} ${param2}`);
    return true;
  } catch (err) {
    console.log("output", err);
    console.log("sdterr", err.stderr.toString());
    return false;
  }
};
