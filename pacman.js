class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = Direction_Right;
        this.nextDirection = this.direction;
        this.frameCount = 7;
        this.currentFrame = 1;
        setInterval(() => {
            this.changeAnimation();
        }, 100);
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if(this.checkCollision()) {
            this.moveBackwards();
        }
    }

    eat() {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (
                    map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i
                ) {
                    map[i][j] = 3;
                    score++;
                }
            }
        }
    }

    moveBackwards() {
        switch(this.direction) {
            case Direction_Right:
                this.x -= this.speed;
                break;
            case Direction_Up:
                this.y += this.speed;
                break;
            case Direction_Left:
                this.x += this.speed;
                break;
            case Direction_Down:
                this.y -= this.speed;
                break;
        }
    }
    moveForwards() {
        switch(this.direction) {
            case Direction_Right:
                this.x += this.speed;
                break;
            case Direction_Up:
                this.y -= this.speed;
                break;
            case Direction_Left:
                this.x -= this.speed;
                break;
            case Direction_Down:
                this.y += this.speed;
                break;
        }
    }

    checkCollision() {
        let isCollided =false;
        if(map[this.getMapY()][this.getMapX()] == 1 || 
        map[this.getMapYRightSide()][this.getMapX()] == 1 ||
        map[this.getMapY()][this.getMapXRightSide()] == 1 ||
        map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    checkGhostCollision() {
        for (let i = 0; i < ghosts.length; i++) {
            let ghost = ghosts[i];
            if (
                ghost.getMapX() == this.getMapX() && ghost.getMapY() == this.getMapY()
            ) {
                return true;
            }
        }
        return false;
    }

    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        //prevents pacman from getting stuck on corners or turn into walls he can't turn into
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }

    changeAnimation() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }
    
    draw() {
        canvasContext.save();
        canvasContext.translate(this.x + oneBlockSize/2, this.y + oneBlockSize /2);
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

        canvasContext.translate(-this.x - oneBlockSize /2, -this.y - oneBlockSize /2);

        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContext.restore();
    }

    getMapX() {
        return parseInt(this.x/oneBlockSize)
    }
    getMapY() {
        return parseInt(this.y/oneBlockSize)
    }
    getMapXRightSide() {
        return parseInt((this.x + 0.99 * oneBlockSize )/oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.99 * oneBlockSize )/oneBlockSize)
    }
}