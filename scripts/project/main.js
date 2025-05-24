let score = 0;
let objectScores = {};

runOnStartup(async runtime => {
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime) {
    runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime) {
    let Santa_ = runtime.objects.Player.getFirstInstance(); // Assuming "Player" is the moving object
    let allObjects = runtime.objects.all;
    
    allObjects.forEach(obj => {
        if (player.testOverlap(obj)) {
            let objectName = obj.name;
            if (!objectScores[objectName]) {
                objectScores[objectName] = 0;
            }
            
            if (objectName.includes("Asset3")) {
                score += 50;
                objectScores[objectName] += 50;
            } else if (objectName.includes("Asset")) {
                score -= 50;
                objectScores[objectName] += 50;
            }
            obj.destroy();
        }
    });
    
    runtime.globalVars.Score = score;
    runtime.globalVars.ObjectScores = JSON.stringify(objectScores);
}

function ShowFinalScores(runtime) {
    console.log("Total Score: " + score);
    console.log("Scores by Object: ", objectScores);
    
    let scoreText = "Total: " + score + "\n";
    for (let obj in objectScores) {
        scoreText += obj + ": " + objectScores[obj] + "\n";
    }
    
    runtime.globalVars.FinalScoreText = scoreText;
}
