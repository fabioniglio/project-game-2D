class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrame = 0;
    this.frameBuffer = 2;
    this.animations = animations;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded) return;
    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      heigh: this.height,
    };
    c.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.heigh,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrame++;
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}
