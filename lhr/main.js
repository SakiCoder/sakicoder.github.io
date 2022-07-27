function generateMotionDirection() {
    let magnet = document.getElementById('magnet').value;
    let current = document.getElementById('current').value;
    let motionDisplay = document.getElementById('motion');
    let motion = "";
    if (magnet === 'north' && current === 'a') {
        motion = "Upwards";
    }
    if (magnet === 'north' && current === 'b') {
        motion = "Downwards";
    }
    if (magnet === 'south' && current === 'a') {
        motion = "Downwards";
    }
    if (magnet === 'south' && current === 'b') {
        motion = "Upwards";
    }
    motionDisplay.innerHTML = motion;
}