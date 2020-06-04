(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.yes_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#01192C").s().p("AhUB8IATgtQAeAVAcAAQArAAAAgeQAAgPgLgNQgKgNgfgQQgggPgMgKQgKgLgHgOQgFgOgBgRQAAghAYgVQAYgVAkAAQAwAAAXASIgPAqQgagSgdAAQgQAAgKAJQgJAJAAAOQAAAYA0AaQAcAOAMAKQAMAMAHAPQAGAPAAATQABAigbAWQgbAWgsAAQgnAAgggUg");
	this.shape.setTransform(87.5,66.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#01192C").s().p("AhYCLIAAkWICxAAIAAAtIiAAAIAABBIBbAAIAAApIhbAAIAABTIB+AAIAAAsg");
	this.shape_1.setTransform(67.15,66.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#01192C").s().p("AgXCLIAAhyIhfikIA1AAIBBB3IBDh3IAzAAIhdCkIAAByg");
	this.shape_2.setTransform(43.45,66.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F2F2F2").s().p("AnWHWQjCjCAAkUQAAkTDCjDQDDjCETAAQEUAADCDCQDDDDAAETQAAEUjDDCQjCDDkUAAQkTAAjDjDg");
	this.shape_3.setTransform(66.5,66.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#18B0FE").s().p("AhUB8IATgtQAeAVAcAAQArAAAAgeQAAgPgLgNQgKgNgfgQQgggPgMgKQgKgLgHgOQgFgOgBgRQAAghAYgVQAYgVAkAAQAwAAAXASIgPAqQgagSgdAAQgQAAgKAJQgJAJAAAOQAAAYA0AaQAcAOAMAKQAMAMAHAPQAGAPAAATQABAigbAWQgbAWgsAAQgnAAgggUg");
	this.shape_4.setTransform(87.5,66.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#18B0FE").s().p("AhYCLIAAkWICxAAIAAAtIiAAAIAABBIBbAAIAAApIhbAAIAABTIB+AAIAAAsg");
	this.shape_5.setTransform(67.15,66.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#18B0FE").s().p("AgXCLIAAhyIhfikIA1AAIBBB3IBDh3IAzAAIhdCkIAAByg");
	this.shape_6.setTransform(43.45,66.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00477F").s().p("AnWHWQjCjCAAkUQAAkTDCjDQDDjCETAAQEUAADCDCQDDDDAAETQAAEUjDDCQjCDDkUAAQkTAAjDjDg");
	this.shape_7.setTransform(66.5,66.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,133,133);


(lib.try_again_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00192C").s().p("AAWA1IAAg7QgBgOgEgGQgGgGgLAAQgFAAgGADQgGADgDAFIAABKIgZAAIAAhnIASAAIAFAJQAJgLATAAQASAAALALQALALAAAUIAAA/g");
	this.shape.setTransform(93.75,15.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00192C").s().p("AgGBIIAAhTIgNAAIAAgUIAlAAIAABngAgDgvQgEgFgBgFQABgGAEgFQADgEAGAAQAGAAAEAEQAEAFAAAGQAAAFgEAFQgEADgGAAQgGAAgDgDg");
	this.shape_1.setTransform(84.55,13.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00192C").s().p("AAXAyQgEgEgCgEQgDAFgIAEQgIADgJAAQgRAAgJgIQgKgJAAgPQAAgSAOgKQANgKAYAAIALACQAAgTgXAAQgOAAgJAFIgFgTQANgGARAAQAXAAALALQALAKAAAfIAAAVQAAAVAJAFQgEAGgDABIgJABQgFAAgEgEgAgWAVQAAAOAQAAQAVAAAAgWIAAgKIgKgBQgbAAAAATg");
	this.shape_2.setTransform(76.675,15.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00192C").s().p("AgtA/IAQgTQAMALAQAAQAKAAAGgDQAHgDAAgFQAAgKgPAAIgLABIgMABQgZAAAAgSQAAgFAEgFQAEgFAGgCQgSgLAAgVQAAgRAMgLQAMgLASAAQANAAAKAFIAJgLIARAPIgLAJQAGAJAAANQAAASgLAKQgLAKgRAAIgGgBIgEAAIgFACQgFACAAACQAAAEAHAAIAKgBIAMgCQAjAAAAAdQAAAQgOAJQgOAJgTAAQgYAAgUgOgAgPgtQgFAGAAAIQAAAJAFAGQAFAFAIAAQAIAAAFgFQAFgGAAgJQAAgIgFgFQgGgGgHAAQgIAAgFAFg");
	this.shape_3.setTransform(66.375,17.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00192C").s().p("AAXAyQgEgEgCgEQgDAFgIAEQgIADgJAAQgRAAgJgIQgKgJAAgPQAAgSAOgKQANgKAYAAIALACQAAgTgXAAQgOAAgJAFIgFgTQANgGARAAQAXAAALALQALAKAAAfIAAAVQAAAVAJAFQgEAGgDABIgJABQgFAAgEgEgAgWAVQAAAOAQAAQAVAAAAgWIAAgKIgKgBQgbAAAAATg");
	this.shape_4.setTransform(56.025,15.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00192C").s().p("AgnAzQAcAAAAgOQAAgJgIgUIgghQIAZAAIAcBIIAZhIIAZAAIguB5QgDAKgMAHQgNAHgRAAg");
	this.shape_5.setTransform(39.25,17.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00192C").s().p("AgjA1IAAhnIAZAAIAAAJQAKgLARAAQAMAAAGAEIgKAUQgHgEgHAAQgJAAgFAIQgHAIAAALIAAA6g");
	this.shape_6.setTransform(30.3,15.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00192C").s().p("AgNBHIAAh3IgtAAIAAgXIB1AAIAAAXIgvAAIAAB3g");
	this.shape_7.setTransform(21.425,13.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#18B0FE").s().p("AAWA1IAAg7QgBgOgEgGQgGgGgLAAQgFAAgGADQgGADgDAFIAABKIgZAAIAAhnIASAAIAFAJQAJgLATAAQASAAALALQALALAAAUIAAA/g");
	this.shape_8.setTransform(93.75,15.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#18B0FE").s().p("AgGBIIAAhTIgNAAIAAgUIAlAAIAABngAgDgvQgEgFgBgFQABgGAEgFQADgEAGAAQAGAAAEAEQAEAFAAAGQAAAFgEAFQgEADgGAAQgGAAgDgDg");
	this.shape_9.setTransform(84.55,13.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#18B0FE").s().p("AAXAyQgEgEgCgEQgDAFgIAEQgIADgJAAQgRAAgJgIQgKgJAAgPQAAgSAOgKQANgKAYAAIALACQAAgTgXAAQgOAAgJAFIgFgTQANgGARAAQAXAAALALQALAKAAAfIAAAVQAAAVAJAFQgEAGgDABIgJABQgFAAgEgEgAgWAVQAAAOAQAAQAVAAAAgWIAAgKIgKgBQgbAAAAATg");
	this.shape_10.setTransform(76.675,15.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#18B0FE").s().p("AgtA/IAQgTQAMALAQAAQAKAAAGgDQAHgDAAgFQAAgKgPAAIgLABIgMABQgZAAAAgSQAAgFAEgFQAEgFAGgCQgSgLAAgVQAAgRAMgLQAMgLASAAQANAAAKAFIAJgLIARAPIgLAJQAGAJAAANQAAASgLAKQgLAKgRAAIgGgBIgEAAIgFACQgFACAAACQAAAEAHAAIAKgBIAMgCQAjAAAAAdQAAAQgOAJQgOAJgTAAQgYAAgUgOgAgPgtQgFAGAAAIQAAAJAFAGQAFAFAIAAQAIAAAFgFQAFgGAAgJQAAgIgFgFQgGgGgHAAQgIAAgFAFg");
	this.shape_11.setTransform(66.375,17.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#18B0FE").s().p("AAXAyQgEgEgCgEQgDAFgIAEQgIADgJAAQgRAAgJgIQgKgJAAgPQAAgSAOgKQANgKAYAAIALACQAAgTgXAAQgOAAgJAFIgFgTQANgGARAAQAXAAALALQALAKAAAfIAAAVQAAAVAJAFQgEAGgDABIgJABQgFAAgEgEgAgWAVQAAAOAQAAQAVAAAAgWIAAgKIgKgBQgbAAAAATg");
	this.shape_12.setTransform(56.025,15.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#18B0FE").s().p("AgnAzQAcAAAAgOQAAgJgIgUIgghQIAZAAIAcBIIAZhIIAZAAIguB5QgDAKgMAHQgNAHgRAAg");
	this.shape_13.setTransform(39.25,17.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#18B0FE").s().p("AgjA1IAAhnIAZAAIAAAJQAKgLARAAQAMAAAGAEIgKAUQgHgEgHAAQgJAAgFAIQgHAIAAALIAAA6g");
	this.shape_14.setTransform(30.3,15.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#18B0FE").s().p("AgNBHIAAh3IgtAAIAAgXIB1AAIAAAXIgvAAIAAB3g");
	this.shape_15.setTransform(21.425,13.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#18B0FE").s().p("Ao+CIIAAkPIR9AAIAAEPg");
	this.shape_16.setTransform(57.5,13.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,115,27.3);


(lib.no_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// no_button1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#01192C").s().p("AhbBpQgegnAAhEQAAg7AhgpQAhgpA2AAQA7gBAgAmQAgAlAABDQAABDghAnQghApg9AAQg4AAgegogAgzhJQgTAbABAsQAAAxAQAbQARAbAfAAQAkgBAUgaQATgbAAgxQAAhihHAAQghAAgRAbg");
	this.shape.setTransform(77.5,66.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#01192C").s().p("ABRCOIiGiwIAACrIgwAAIAAkWIAYAAICDCoIAAioIAwAAIAAEbg");
	this.shape_1.setTransform(50.825,66.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2F2F2").s().p("AnWHWQjCjCAAkUQAAkTDCjDQDDjCETAAQEUAADCDCQDDDDAAETQAAEUjDDCQjCDDkUAAQkTAAjDjDg");
	this.shape_2.setTransform(66.5,66.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#18B0FE").s().p("AhbBpQgegnAAhEQAAg7AhgpQAhgpA2AAQA7gBAgAmQAgAlAABDQAABDghAnQghApg9AAQg4AAgegogAgzhJQgTAbABAsQAAAxAQAbQARAbAfAAQAkgBAUgaQATgbAAgxQAAhihHAAQghAAgRAbg");
	this.shape_3.setTransform(77.5,66.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#18B0FE").s().p("ABRCOIiGiwIAACrIgwAAIAAkWIAYAAICDCoIAAioIAwAAIAAEbg");
	this.shape_4.setTransform(50.825,66.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00477F").s().p("AnWHWQjCjCAAkUQAAkTDCjDQDDjCETAAQEUAADCDCQDDDDAAETQAAEUjDDCQjCDDkUAAQkTAAjDjDg");
	this.shape_5.setTransform(66.5,66.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,133,133);


// stage content:
(lib.RECOVER_Untitled2_202063193751 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,2,4];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.no_button1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(5);
		});
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.yes_button1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(2);
		});
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.try_again.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(0);
		});
	}
	this.frame_2 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.no_button2.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(4);
		});
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.yes_button2.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(3);
		});
	}
	this.frame_4 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.yes_button3.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(3);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.no_button3.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(5);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(2).call(this.frame_4).wait(16));

	// no_button
	this.no_button1 = new lib.no_button();
	this.no_button1.name = "no_button1";
	this.no_button1.setTransform(322.5,235.95);
	new cjs.ButtonHelper(this.no_button1, 0, 1, 2, false, new lib.no_button(), 3);

	this.no_button2 = new lib.no_button();
	this.no_button2.name = "no_button2";
	this.no_button2.setTransform(322.5,235.9);
	new cjs.ButtonHelper(this.no_button2, 0, 1, 2, false, new lib.no_button(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.no_button1}]}).to({state:[]},1).to({state:[{t:this.no_button2}]},1).to({state:[]},1).wait(17));

	// yes_button
	this.yes_button1 = new lib.yes_button();
	this.yes_button1.name = "yes_button1";
	this.yes_button1.setTransform(158.5,302.45,1,1,0,0,0,66.5,66.5);
	new cjs.ButtonHelper(this.yes_button1, 0, 1, 2, false, new lib.yes_button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.yes_button1).to({_off:true},1).wait(19));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00192C").s().p("AgUBaQgGgGAAgJQAAgJAGgFQAGgHAJAAQAIAAAGAHQAFAFABAJQgBAJgFAGQgGAGgIAAQgJAAgGgGgAgSAlIgDgGQgCgGAAgEQAAgIACgHQACgHAEgGIARgVQANgOAAgJQAAgSgXAAQgLAAgNAMIgMgZQAQgNAbAAQATAAAOAMQANALAAATQAAANgEAJQgFAJgNAMQgNALgDAIQgEAIAAAJIACALg");
	this.shape.setTransform(442.4,184.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00192C").s().p("AgWBEIAAieIAegHIAACXQABAaAPAEQgIAOgRAAQgVAAAAgeg");
	this.shape_1.setTransform(433.5,183.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgeASgUQARgTAdAAQAfgBARAUQARASAAAgQAAAggRATQgSAUgegBQgeAAgRgTgAgXggQgIAMAAAUQAAAtAfgBQAPABAIgMQAJgLAAgWQAAgrggAAQgOgBgJAMg");
	this.shape_2.setTransform(421.575,186.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgeASgUQARgTAdAAQAfgBARAUQARASAAAgQAAAggRATQgSAUgegBQgeAAgRgTgAgXggQgIAMAAAUQAAAtAfgBQAPABAIgMQAJgLAAgWQAAgrggAAQgOgBgJAMg");
	this.shape_3.setTransform(406.875,186.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAGQAEAHAMAAQALgBAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_4.setTransform(394.275,184.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00192C").s().p("AgZBEQgIgCgNgHIALgZQAOAMASAAQARAAAAgOQABgIgGgEQgGgGgPgHQgigNgBgaQAAgSAOgJQANgKAUAAQAVAAATAJIgJAYQgKgIgTAAQgQAAAAANQAAAFAGAEQAFAFARAGQASAHAIAJQAHALABAOQAAATgOAKQgOALgYAAQgNAAgIgCg");
	this.shape_5.setTransform(375.85,186.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgFg+QgFgFAAgIQAAgIAFgFQAFgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgFgFg");
	this.shape_6.setTransform(365.95,184.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00192C").s().p("AAcBhIAAhUQAAgMgIgHQgHgIgNABQgHAAgIADQgIAFgDAFIAABhIghAAIAAi6IAhgHIAABDQAMgLAUAAQAaAAAOANQAOAPAAAZIAABUg");
	this.shape_7.setTransform(354.8,183.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAGQAEAHAMAAQALgBAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_8.setTransform(341.875,184.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00192C").s().p("Ag7BRIAVgYQAQAPAVAAQANAAAIgEQAJgEAAgHQAAgNgUAAIgPACIgQABQggAAAAgYQAAgGAFgGQAGgHAHgDQgXgOAAgcQAAgVAQgPQAQgPAXAAQARAAANAIIAMgPIAWAUIgPALQAIAMAAARQAAAXgOAOQgPANgVAAIgIgCIgFAAIgHADQgGACAAADQAAAGAJAAIANgCQAJgCAGgBQAuAAAAAmQAAAVgSALQgTAMgZAAQgfAAgagTgAgUg6QgHAGAAAMQAAALAHAIQAHAHALAAQAKAAAGgHQAGgHAAgMQAAgLgGgHQgGgHgKAAQgLAAgHAHg");
	this.shape_9.setTransform(322.6,188.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_10.setTransform(308.325,186.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAxAAIAACHgAgEg+QgGgFAAgIQAAgIAGgFQAEgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgEgFg");
	this.shape_11.setTransform(296.35,184.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00192C").s().p("AgZBEQgJgCgMgHIALgZQAPAMARAAQASAAAAgOQgBgIgFgEQgGgGgOgHQgkgNABgaQgBgSANgJQAOgKAUAAQAVAAATAJIgJAYQgLgIgSAAQgPAAAAANQAAAFAEAEQAGAFARAGQASAHAIAJQAIALAAAOQAAATgOAKQgPALgWAAQgOAAgIgCg");
	this.shape_12.setTransform(287.35,186.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00192C").s().p("AgZBEQgJgCgMgHIALgZQAOAMASAAQASAAgBgOQAAgIgFgEQgGgGgPgHQgjgNAAgaQABgSANgJQANgKAUAAQAVAAATAJIgJAYQgKgIgTAAQgPAAAAANQAAAFAEAEQAGAFARAGQASAHAIAJQAIALAAAOQAAATgOAKQgOALgXAAQgOAAgIgCg");
	this.shape_13.setTransform(276.2,186.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00192C").s().p("AgvA0QgSgSAAggQAAggATgTQAUgVAbABQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRANghAAQgeABgSgTgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_14.setTransform(263.175,186.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00192C").s().p("AgnA0QgSgSAAghQAAgfATgTQAUgVAiABQAYAAARANIgOAYQgLgLgTAAQgRAAgKAMQgKAMAAAUQAAArAnAAQASAAANgMIAMAaQgOAIgKACQgKACgPAAQgeABgSgTg");
	this.shape_15.setTransform(249.075,186.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00192C").s().p("AgnA0QgSgSAAghQAAgfATgTQAUgVAiABQAYAAARANIgOAYQgLgLgTAAQgRAAgKAMQgKAMAAAUQAAArAnAAQASAAANgMIAMAaQgOAIgKACQgKACgPAAQgeABgSgTg");
	this.shape_16.setTransform(235.775,186.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00192C").s().p("AAeBCQgGgGgBgFQgFAGgLAFQgJAFgMgBQgWAAgNgLQgMgLAAgTQAAgYASgMQARgOAgAAQAGAAAHACQAAgYgeAAQgRAAgMAGIgHgYQAQgIAXAAQAeAAAPANQAOAPAAAnIAAAcQAAAcALAGQgEAIgFABQgFABgGAAQgHAAgFgEgAgeAbQABASAUABQAdgBAAgdIAAgMIgNgBQglgBAAAZg");
	this.shape_17.setTransform(222.3,186.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00192C").s().p("AgvA0QgSgSAAggQAAggATgTQAUgVAbABQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRANghAAQgeABgSgTgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_18.setTransform(200.025,186.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00192C").s().p("AglBYIgHAKIgSAAIAAi8IAggHIAAA/QANgIAPAAQAdAAARATQATATAAAcQAAAjgTATQgSAUgeAAQgUAAgNgKgAgegHIAABGQAHAIAMAAQAWAAAKgLQAJgKAAgYQAAgpgnAAQgOAAgHAIg");
	this.shape_19.setTransform(185.2,183.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00192C").s().p("AgZBEQgIgCgNgHIALgZQAPAMARAAQARAAAAgOQABgIgGgEQgFgGgQgHQgigNAAgaQAAgSAMgJQAOgKAUAAQAVAAATAJIgJAYQgLgIgSAAQgQAAAAANQAAAFAGAEQAFAFARAGQASAHAIAJQAHALAAAOQAAATgNAKQgPALgXAAQgNAAgIgCg");
	this.shape_20.setTransform(164.1,186.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAWAAQAPAAAJAFIgNAbQgJgGgKAAQgLAAgHAKQgJAKAAAPIAABMg");
	this.shape_21.setTransform(153.7,186.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00192C").s().p("AgvA0QgSgSAAggQAAggATgTQAUgVAbABQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRANghAAQgeABgSgTgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_22.setTransform(139.975,186.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00192C").s().p("AgZBEQgJgCgMgHIALgZQAPAMARAAQARAAABgOQAAgIgGgEQgGgGgOgHQgkgNABgaQgBgSANgJQAOgKAUAAQAWAAASAJIgJAYQgLgIgSAAQgPAAgBANQABAFAFAEQAFAFARAGQASAHAIAJQAIALgBAOQAAATgNAKQgPALgWAAQgOAAgIgCg");
	this.shape_23.setTransform(126.95,186.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00192C").s().p("Ag7ATIAAhXIAgAAIAABVQAAAaAYAAQAJAAAKgGQAJgFADgIIAAhcIAgAAIAACHIggAAIAAgMQgHAGgMAEQgKAEgKAAQgwAAAAgyg");
	this.shape_24.setTransform(113.675,186.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00192C").s().p("AgXBEIAAieIAggHIAACXQgBAaAPAEQgHAOgRAAQgWAAAAgeg");
	this.shape_25.setTransform(461.55,151.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00192C").s().p("AAdBBQgFgEgBgGQgFAGgLAFQgKAFgLAAQgWAAgMgMQgNgKAAgUQAAgYARgMQASgOAgAAQAGAAAHACQAAgYgdAAQgSAAgMAGIgHgYQAQgJAXABQAegBAOAOQAPAPAAAnIAAAdQAAAbALAGQgEAIgFABQgFACgGAAQgHgBgGgFgAgdAbQAAATAUAAQAcAAAAgdIAAgNIgMgBQgkgBAAAZg");
	this.shape_26.setTransform(450.15,154.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_27.setTransform(435.475,154.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAWAAQAPAAAJAFIgOAbQgIgGgKAAQgLAAgHAKQgJAKAAAPIAABMg");
	this.shape_28.setTransform(423,154.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00192C").s().p("AgvA1QgSgTAAggQAAgfATgVQAUgTAbAAQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRAOghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_29.setTransform(409.275,154.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAGQAEAHAMgBQALAAAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_30.setTransform(396.575,152.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00192C").s().p("AAhBEIgigtIggAtIglAAIA0hEIgwhDIAlAAIAcAqIAfgqIAkAAIg0BDIA5BEg");
	this.shape_31.setTransform(384.325,154.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#00192C").s().p("AgvA1QgSgTAAggQAAgfATgVQAUgTAbAAQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRAOghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_32.setTransform(369.725,154.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAWAAQAPAAAJAFIgOAbQgIgGgKAAQgLAAgHAKQgJAKAAAPIAABMg");
	this.shape_33.setTransform(349.65,154.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#00192C").s().p("AgvA1QgSgTAAggQAAgfATgVQAUgTAbAAQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRAOghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_34.setTransform(335.925,154.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00192C").s().p("AAcBhIAAhUQAAgMgIgHQgHgHgNAAQgHAAgIADQgIAFgEAFIAABhIggAAIAAi5IAggIIAABCQAMgLAVABQAagBAOAOQAOAPAAAZIAABUg");
	this.shape_35.setTransform(320.75,151.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAGQAEAHAMgBQALAAAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_36.setTransform(307.825,152.7);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgfASgTQARgUAdABQAfAAARASQARATAAAgQAAAggRATQgSAUgeAAQgegBgRgTgAgXggQgIAMAAAUQAAAtAfAAQAPAAAIgMQAJgMAAgVQAAgsggABQgOAAgJALg");
	this.shape_37.setTransform(295.425,154.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAVAAQARAAAIAFIgNAbQgJgGgKAAQgLAAgIAKQgIAKAAAPIAABMg");
	this.shape_38.setTransform(275.45,154.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgfASgTQARgUAdABQAfAAARASQARATAAAgQAAAggRATQgSAUgeAAQgegBgRgTgAgXggQgIAMAAAUQAAAtAfAAQAPAAAIgMQAJgMAAgVQAAgsggABQgOAAgJALg");
	this.shape_39.setTransform(261.825,154.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#00192C").s().p("AgZBEQgJgCgMgHIALgZQAPAMARAAQASAAAAgOQgBgIgFgEQgGgFgPgHQgjgOAAgaQABgSANgKQANgKAUABQAVAAATAJIgJAZQgKgJgTAAQgPAAAAANQAAAFAEAEQAGAFARAGQASAIAIAIQAIAKAAAPQAAATgOAKQgOAMgXAAQgOgBgIgCg");
	this.shape_40.setTransform(241.1,154.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAGQAEAHAMgBQALAAAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_41.setTransform(230.275,152.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_42.setTransform(217.575,154.425);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#00192C").s().p("AgvA1QgSgTAAggQAAgfATgVQAUgTAbAAQAeAAASARQARASAAAbQAAAGgCALIhgAAQABAQAKAJQAKAJAQAAQAWAAALgMIANAZQgRAOghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_43.setTransform(202.475,154.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#00192C").s().p("AguBQQgQgSAAggQAAgfATgUQASgVAcAAQAPAAANAHIAAg3IAggHIAADBIggAAIAAgJQgEAFgJADQgKADgJAAQgcAAgRgSgAgTgDQgKAKAAAWQAAArAoAAQAEAAAHgDQAHgDACgDIAAhGQgKgIgLAAQgSAAgLAMg");
	this.shape_44.setTransform(187.325,151.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#00192C").s().p("Ag7ATIAAhXIAgAAIAABVQAAAaAYAAQAJAAAKgGQAJgFADgIIAAhcIAgAAIAACHIggAAIAAgMQgHAGgMAEQgKAEgKAAQgwAAAAgyg");
	this.shape_45.setTransform(172.275,154.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#00192C").s().p("AgRBOQgLgMAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAGQAEAHAMgBQALAAAKgGIAAAdQgLAEgVAAQgTAAgLgLg");
	this.shape_46.setTransform(159.375,152.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#00192C").s().p("AgZBEQgJgCgMgHIALgZQAPAMARAAQASAAAAgOQgBgIgFgEQgGgFgOgHQgkgOAAgaQAAgSANgKQAOgKAUABQAVAAATAJIgJAZQgLgJgSAAQgPAAAAANQAAAFAEAEQAGAFARAGQASAIAIAIQAIAKAAAPQAAATgOAKQgPAMgWAAQgOgBgIgCg");
	this.shape_47.setTransform(148.75,154.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#00192C").s().p("AgWBEIAAieIAegHIAACXQAAAaAPAEQgHAOgRAAQgWAAABgeg");
	this.shape_48.setTransform(132.3,151.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#00192C").s().p("AgWBEIAAieIAegHIAACXQAAAaAPAEQgHAOgRAAQgWAAABgeg");
	this.shape_49.setTransform(124.65,151.775);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgFg+QgFgFAAgIQAAgIAFgFQAFgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgFgFg");
	this.shape_50.setTransform(115.75,151.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#00192C").s().p("AApBeIgph0IgmB0IgOAAIg9i7IAiAAIAjBvIAmhvIANAAIAmBvIAjhvIAiAAIg8C7g");
	this.shape_51.setTransform(100.825,152.175);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#00192C").s().p("AATAjIgTgpIgRApIgHAAIgZhFIAQAAIAOAoIARgoIAEAAIARAoIAQgoIAPAAIgZBFg");
	this.shape_52.setTransform(304.15,364.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPgBQgOABgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_53.setTransform(295.375,364.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#00192C").s().p("AgKAiIAAhPIAOgDIAABLQAAANAHACQgDAHgIAAQgKAAAAgPg");
	this.shape_54.setTransform(290.2,362.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#00192C").s().p("AgNAwIAAg2IgKAAIAAgNIAKAAQAAgNAHgHQAGgIALAAQAGAAAHACIgEANIgIgCQgFAAgDAEQgDAEAAAFIAAACIAOAAIAAANIgNAAIAAA2g");
	this.shape_55.setTransform(285.75,362.7);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_56.setTransform(279.275,364.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_57.setTransform(271.725,364.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_58.setTransform(264.275,364.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIAKAAQAJAAAEADIgGAOQgFgDgFAAQgFAAgDAFQgFAFAAAHIAAAmg");
	this.shape_59.setTransform(258.15,364.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHAAQgPAAgJgJg");
	this.shape_60.setTransform(251.675,364.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#00192C").s().p("AgbAqIAGgQQAKAIAJAAQAOAAAAgKQAAgFgEgFQgDgEgKgFQgLgFgDgDQgEgEgCgEQgCgGAAgFQAAgLAIgHQAIgHALAAQAQAAAIAGIgFAOQgJgGgJAAQgFAAgDADQgDADAAAFQAAAIAQAIQAKAFAEADQAEADACAGQACAFAAAGQAAAMgJAHQgJAHgOAAQgNAAgKgGg");
	this.shape_61.setTransform(245.075,362.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#00192C").s().p("AgMAOQALgJAAgFIgBgCQgGgDAAgGQAAgDAEgDQADgDADABQAFAAADADQADADAAAEQAAAJgDAFQgFAHgLAIg");
	this.shape_62.setTransform(394.65,350.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_63.setTransform(388.775,347);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgBgeQgDgDAAgEQAAgEADgCQABgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgBgCg");
	this.shape_64.setTransform(382.9,345.675);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#00192C").s().p("AgCAjIgfhFIARAAIAQApIARgpIARAAIgfBFg");
	this.shape_65.setTransform(377.375,347.075);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPgBQgOABgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_66.setTransform(370.275,347);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#00192C").s().p("AgCAvIgTgyIgKAxIgPAAIAShcIAJAAIATA9IAUg9IAJAAIASBcIgQAAIgJgxIgTAyg");
	this.shape_67.setTransform(361.825,345.825);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_68.setTransform(354.8,345.675);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#00192C").s().p("AgHAiQgEgEAAgEQAAgFAEgDQADgDAEAAQAFAAADADQADADABAFQgBAEgDAEQgDADgFAAQgEAAgDgDgAgHgRQgEgDAAgFQAAgEAEgEQADgDAEAAQAFAAADADQADAEABAEQgBAFgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_69.setTransform(346.7,347);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_70.setTransform(340.625,345.625);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_71.setTransform(333.225,347);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHAAQgPAAgJgJg");
	this.shape_72.setTransform(326.175,347);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_73.setTransform(319.025,346.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#00192C").s().p("AAPAhQgDgDgBgDQgCAEgFACQgFACgGAAQgKAAgHgFQgGgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgPAAQgIAAgGADIgEgMQAJgFAKAAQAPABAHAHQAIAHAAAUIAAANQgBAOAGADIgEAFIgGAAQgDAAgDgCgAgOAOQAAAIAKABQAOAAAAgOIAAgHIgGgBQgSAAAAANg");
	this.shape_74.setTransform(311.8,347);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_75.setTransform(304.475,346.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgBgeQgDgDAAgEQAAgEADgCQABgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgBgCg");
	this.shape_76.setTransform(298.5,345.675);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#00192C").s().p("AgNAwIAAg2IgKAAIAAgNIAKAAQAAgNAHgHQAGgIALAAQAGAAAHACIgEANIgIgCQgEAAgDAEQgEAEAAAFIAAACIAOAAIAAANIgNAAIAAA2g");
	this.shape_77.setTransform(294.65,345.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#00192C").s().p("AgQAHIAAgOIAhAAIAAAOg");
	this.shape_78.setTransform(289.625,346.65);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#00192C").s().p("AgNAwIAAg2IgKAAIAAgNIAKAAQAAgNAHgHQAGgIALAAQAFAAAIACIgEANIgIgCQgEAAgDAEQgEAEAAAFIAAACIAOAAIAAANIgOAAIAAA2g");
	this.shape_79.setTransform(285.1,345.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#00192C").s().p("AgKAiIAAhPIAOgDIAABLQAAANAHACQgDAHgIAAQgKAAAAgPg");
	this.shape_80.setTransform(280.95,345.625);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_81.setTransform(274.925,347);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJAAQAIAAAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgIAHgFQAGgGAKAAQALAAAJAGIgFAMQgFgFgJABQgIgBAAAHQABADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLAAQgHAAgEgBg");
	this.shape_82.setTransform(268.45,347);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#00192C").s().p("AgYAvIAihdIAPAAIgiBdg");
	this.shape_83.setTransform(259.275,345.725);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_84.setTransform(248.975,346.925);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPgBQgOABgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_85.setTransform(241.475,347);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgBgeQgDgDAAgEQAAgEADgCQABgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgBgCg");
	this.shape_86.setTransform(235.65,345.675);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJAAQAIAAAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgIAHgFQAGgGAKAAQAKAAAKAGIgFAMQgFgFgJABQgIgBABAHQAAADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLAAQgHAAgEgBg");
	this.shape_87.setTransform(231.2,347);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgHAOQgEgDgFAAQgGAAgDAFQgEAFAAAHIAAAmg");
	this.shape_88.setTransform(226,346.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_89.setTransform(219.125,347);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#00192C").s().p("AgCAjIgfhFIARAAIAQApIARgpIARAAIgfBFg");
	this.shape_90.setTransform(211.975,347.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_91.setTransform(200.925,347);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_92.setTransform(193.475,347);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIAKAAQAJAAAEADIgHAOQgEgDgFAAQgGAAgCAFQgFAFAAAHIAAAmg");
	this.shape_93.setTransform(187.35,346.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#00192C").s().p("AgNAwIAAg2IgKAAIAAgNIAKAAQAAgNAHgHQAGgIALAAQAFAAAIACIgEANIgIgCQgEAAgDAEQgEAEAAAFIAAACIAOAAIAAANIgOAAIAAA2g");
	this.shape_94.setTransform(182.05,345.6);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_95.setTransform(171.775,347);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJAAQAJAAAAgHQAAgEgDgDQgDgCgIgDQgRgHAAgNQAAgIAHgFQAGgGAKAAQAKAAAKAGIgEAMQgGgFgJABQgIgBAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLAAQgHAAgEgBg");
	this.shape_96.setTransform(165.3,347);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#00192C").s().p("AgZAnQgIgIgBgOIAAg/IARAAIAAA+QAAAHAFAFQAEAFAIAAQAIAAAFgFQAFgFAAgIIAAg9IARAAIAAA/QAAAOgKAIQgJAIgQAAQgQAAgJgIg");
	this.shape_97.setTransform(158.1,345.825);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgEACgHAAQgLAAgGgFQgGgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgKAAgFADIgEgMQAJgFALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGAAQgDAAgDgCgAgOAOQAAAIALABQANAAAAgOIAAgHIgGgBQgSAAAAANg");
	this.shape_98.setTransform(339.9,329.9);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_99.setTransform(334.25,328.575);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJAAQAJAAAAgHQAAgEgEgDQgCgCgIgDQgRgHAAgNQAAgIAHgFQAHgGAJAAQAKAAAKAGIgEAMQgGgFgJABQgIgBAAAHQAAADADACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLAAQgHAAgEgBg");
	this.shape_100.setTransform(329.8,329.9);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#00192C").s().p("AAPAhQgDgDgBgDQgCAEgFACQgEACgHAAQgKAAgHgFQgGgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgPAAQgIAAgGADIgEgMQAJgFALAAQAOABAHAHQAIAHAAAUIAAANQAAAOAFADIgEAFIgGAAQgDAAgDgCgAgOAOQAAAIALABQANAAAAgOIAAgHIgGgBQgSAAAAANg");
	this.shape_101.setTransform(323.6,329.9);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAOgGIAAAUIATAAIAAANIgTAAIAAAdQABAHACADQACADAGAAQAFAAAGgDIAAAPQgGABgLAAQgJABgFgHg");
	this.shape_102.setTransform(317.5,329);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_103.setTransform(309.375,329.825);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgEACgHAAQgKAAgGgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgKAAgFADIgEgMQAJgFALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGAAQgDAAgDgCgAgOAOQAAAIALABQANAAAAgOIAAgHIgGgBQgSAAAAANg");
	this.shape_104.setTransform(300.4,329.9);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#00192C").s().p("AgXAjQgLgMAAgXQAAgTAMgOQAMgOARAAQAQAAAKAHIgHANQgFgGgNAAQgKAAgIALQgHAJAAAOQAAAPAHAJQAHAJAKAAQANAAAIgKIAHANQgKALgTAAQgTAAgKgNg");
	this.shape_105.setTransform(292.975,328.65);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#00192C").s().p("AgHAiQgEgEABgEQgBgFAEgEQADgCAEAAQAFAAADACQAEAEgBAFQABAEgEAEQgDADgFAAQgEAAgDgDgAgHgRQgEgDABgFQgBgEAEgEQADgDAEAAQAFAAADADQAEAEgBAEQABAFgEADQgDAEgFAAQgEAAgDgEg");
	this.shape_106.setTransform(282.55,329.9);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_107.setTransform(276.575,329.9);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHAAQgPAAgJgJg");
	this.shape_108.setTransform(269.525,329.9);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_109.setTransform(262.375,329.825);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQgBQgPAAgJgJgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_110.setTransform(254.825,329.9);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHAAQgPAAgJgJg");
	this.shape_111.setTransform(247.775,329.9);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_112.setTransform(242.3,328.575);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#00192C").s().p("AgKAiIAAhPIAOgDIAABLQAAANAHACQgDAHgIAAQgKAAAAgPg");
	this.shape_113.setTransform(239.1,328.525);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_114.setTransform(229.075,328.525);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgBgeQgDgDAAgEQAAgEADgCQABgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgBgCg");
	this.shape_115.setTransform(223.25,328.575);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgEACgGAAQgMAAgFgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgJAAgHADIgDgMQAJgFALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGAAQgDAAgDgCgAgOAOQAAAIALABQANAAAAgOIAAgHIgGgBQgSAAAAANg");
	this.shape_116.setTransform(218.15,329.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#00192C").s().p("AgeAvIAAhcIAUgBQAVAAAKAHQAKAHAAAOQAAAfglAAIgHAAIAAAigAgNgfIAAAeIAGAAQALAAAFgDQAFgEAAgJQAAgOgWAAg");
	this.shape_117.setTransform(211.675,328.625);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAcQAAAIACADQADADAFAAQAHAAAEgDIAAAPQgFABgKABQgJAAgGgHg");
	this.shape_118.setTransform(324.75,311.9);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_119.setTransform(320.05,311.475);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#00192C").s().p("AgdApIAKgNQAJAIAKAAQAGAAAEgCQAFgCAAgEQAAgGgKAAIgHABIgIABQgRAAAAgMQAAgEADgDQADgDAEgCQgMgGAAgOQAAgLAIgHQAIgHAMAAQAIAAAGADIAGgHIALAKIgHAGQADAGAAAIQAAALgHAHQgHAGgKAAIgEAAIgDgBIgDACQgBAAAAABQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAABAAIAHgBIAHgBQAXAAAAATQAAAKgJAGQgJAGgNAAQgPAAgNgJgAgJgdQgEAEAAAFQAAAGADAEQAEADAFAAQAFAAADgDQADgEAAgGQAAgFgDgEQgDgDgFAAQgFAAgDADg");
	this.shape_120.setTransform(315.175,313.875);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgPAAQgJAAgGADIgDgMQAIgFALAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDgBgDgCgAgOAOQAAAIAKABQAOAAAAgPIAAgGIgGgBQgSAAAAANg");
	this.shape_121.setTransform(308.45,312.8);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_122.setTransform(301.125,312.725);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#00192C").s().p("AgbAqIAGgQQAKAIAJAAQAOgBAAgJQAAgFgEgFQgDgEgKgFQgLgFgDgDQgEgEgCgEQgCgFAAgGQAAgLAIgHQAIgHALAAQAQAAAIAGIgFAOQgJgGgJAAQgFAAgDADQgDADAAAFQAAAIAQAIQAKAFAEADQAEADACAGQACAFAAAGQAAAMgJAHQgJAHgOAAQgNAAgKgGg");
	this.shape_123.setTransform(294.025,311.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#00192C").s().p("AgHAiQgDgEgBgEQABgFADgEQADgCAEAAQAFAAADACQAEAEAAAFQAAAEgEAEQgDADgFAAQgEAAgDgDgAgHgRQgDgDgBgFQABgEADgEQADgDAEAAQAFAAADADQAEAEAAAEQAAAFgEADQgDAEgFAAQgEAAgDgEg");
	this.shape_124.setTransform(284.3,312.8);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#00192C").s().p("AgdApIAKgNQAJAIAKAAQAGAAAEgCQAFgCAAgEQAAgGgKAAIgHABIgIABQgRAAAAgMQAAgEADgDQADgDAEgCQgMgGAAgOQAAgLAIgHQAIgHAMAAQAIAAAGADIAGgHIALAKIgHAGQADAGAAAIQAAALgHAHQgHAGgKAAIgEAAIgDgBIgDACQgBAAAAABQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAABABQAAAAAAABQABAAABAAQAAAAABAAIAHgBIAHgBQAXAAAAATQAAAKgJAGQgJAGgNAAQgPAAgNgJgAgJgdQgEAEAAAFQAAAGADAEQAEADAFAAQAFAAADgDQADgEAAgGQAAgFgDgEQgDgDgFAAQgFAAgDADg");
	this.shape_125.setTransform(278.875,313.875);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_126.setTransform(271.875,312.8);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#00192C").s().p("AgKAiIAAhPIAOgDIAABLQAAANAHACQgDAHgIAAQgLAAABgPg");
	this.shape_127.setTransform(266.7,311.425);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgJAAgHADIgDgMQAIgFALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDgBgDgCgAgOAOQAAAIAKABQAOAAAAgPIAAgGIgGgBQgSAAAAANg");
	this.shape_128.setTransform(261,312.8);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAcQAAAIABADQADADAFAAQAGAAAFgDIAAAPQgFABgLABQgIAAgGgHg");
	this.shape_129.setTransform(254.9,311.9);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgPAAQgIAAgHADIgDgMQAIgFALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDgBgDgCgAgOAOQAAAIAKABQAOAAAAgPIAAgGIgGgBQgSAAAAANg");
	this.shape_130.setTransform(248.95,312.8);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHABQgPAAgJgKg");
	this.shape_131.setTransform(242.125,312.8);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_132.setTransform(231.075,312.725);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#00192C").s().p("AgHAuIAAhcIAPAAIAABcg");
	this.shape_133.setTransform(225.475,311.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#00192C").s().p("AgHAiQgDgEgBgEQABgFADgEQADgCAEAAQAEAAAEACQADAEABAFQgBAEgDAEQgEADgEAAQgEAAgDgDgAgHgRQgDgDgBgFQABgEADgEQADgDAEAAQAEAAAEADQADAEABAEQgBAFgDADQgEAEgEAAQgEAAgDgEg");
	this.shape_134.setTransform(375.75,295.7);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#00192C").s().p("AgOAzQAMgOAAgmQAAgigMgRIAAgJQANAGAHASQAJASAAASQAAATgHARQgIARgOAKg");
	this.shape_135.setTransform(371.325,295.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_136.setTransform(365.025,295.7);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIAKAAQAJAAAEADIgHAOQgEgDgFAAQgGAAgDAFQgEAFAAAHIAAAmg");
	this.shape_137.setTransform(358.9,295.625);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgJAAgHADIgDgMQAIgFALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDgBgDgCgAgOAOQAAAIAKABQAOAAAAgPIAAgGIgGgBQgSAAAAANg");
	this.shape_138.setTransform(352.35,295.7);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#00192C").s().p("AATAjIgTgpIgSApIgFAAIgahFIARAAIANAoIARgoIAFAAIARAoIAOgoIAQAAIgaBFg");
	this.shape_139.setTransform(343.8,295.775);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#00192C").s().p("AgIAmQgGgFAAgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAcQAAAIACADQADADAFAAQAHAAAEgDIAAAPQgFABgKAAQgJABgGgHg");
	this.shape_140.setTransform(336.1,294.8);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#00192C").s().p("AgOAwIAAg2IgKAAIAAgNIAKAAQABgNAHgHQAGgIALAAQAGAAAHACIgEANIgIgCQgFAAgDAEQgDAEAAAFIAAACIAOAAIAAANIgNAAIAAA2g");
	this.shape_141.setTransform(331.4,294.3);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_142.setTransform(325.075,295.7);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJAAQAJAAAAgHQAAgEgDgDQgDgCgIgDQgRgHAAgNQAAgIAHgFQAGgGAKAAQAKAAAKAGIgEAMQgGgFgJABQgIgBAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_143.setTransform(318.65,295.7);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#00192C").s().p("AgdApIAKgNQAJAIAKAAQAGAAAEgCQAFgCAAgEQAAgGgKAAIgHABIgIABQgRAAAAgMQAAgEADgDQADgDAEgCQgMgGAAgOQAAgLAIgHQAIgHAMAAQAIAAAGADIAGgHIALAKIgHAGQADAGAAAIQAAALgHAHQgHAGgKAAIgEAAIgDgBIgDACQgBAAAAABQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAABAAIAHgBIAHgBQAXAAAAATQAAAKgJAGQgJAGgNAAQgPAAgNgJgAgJgdQgEAEAAAFQAAAGADAEQAEADAFAAQAFAAADgDQADgEAAgGQAAgFgDgEQgDgDgFAAQgFAAgDADg");
	this.shape_144.setTransform(308.775,296.775);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_145.setTransform(301.625,295.625);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_146.setTransform(295.65,294.375);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAcQAAAIABADQADADAFAAQAGAAAFgDIAAAPQgFABgLAAQgIABgGgHg");
	this.shape_147.setTransform(291.35,294.8);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_148.setTransform(286.65,294.375);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_149.setTransform(281.125,294.325);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_150.setTransform(273.725,295.7);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgPAJgKQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPABQAHgBAFgFQAEgHAAgKQAAgVgQAAQgGAAgFAFg");
	this.shape_151.setTransform(262.425,295.7);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_152.setTransform(255.025,295.7);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_153.setTransform(247.475,294.325);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_154.setTransform(241.65,294.375);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#00192C").s().p("AgCAjIgfhFIARAAIAQApIARgpIARAAIgfBFg");
	this.shape_155.setTransform(236.125,295.775);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#00192C").s().p("AgGAjQgIgRAAgTQAAgSAIgSQAIgSANgGIAAAJQgMARAAAiQAAAmAMAOIAAALQgPgKgGgRg");
	this.shape_156.setTransform(230.525,295.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAEQAFAFAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_157.setTransform(220.325,295.7);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#00192C").s().p("AgLAiIAAhPIAPgDIAABLQAAANAIACQgEAHgIAAQgLAAAAgPg");
	this.shape_158.setTransform(215.1,294.325);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#00192C").s().p("AgeAwIAAhdIAPAAIAAAEQAGgGAJAAQAfAAABAkQAAAPgJAKQgKAJgOAAQgHAAgHgDIAAAcgAgPgdIAAAjQAEADAHAAQAJAAAFgFQAFgEAAgLQAAgMgFgFQgEgGgKAAQgHABgEAEg");
	this.shape_159.setTransform(209.15,296.95);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_160.setTransform(199.675,295.625);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgEACgGABQgMgBgFgFQgHgGAAgKQAAgMAJgFQAJgHAPAAIAHABQAAgMgOAAQgJAAgHADIgDgMQAJgFALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDgBgDgCgAgOAOQAAAIALABQANAAAAgPIAAgGIgGgBQgSAAAAANg");
	this.shape_161.setTransform(190.7,295.7);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#00192C").s().p("AAQAiIgQgWIgQAWIgTAAIAagiIgYghIASAAIAPAVIAPgVIASAAIgaAhIAcAig");
	this.shape_162.setTransform(183.65,295.7);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#00192C").s().p("AgdAuIAAhcIA7AAIAAAPIgqAAIAAAWIAdAAIAAANIgdAAIAAAcIApAAIAAAOg");
	this.shape_163.setTransform(176.625,294.45);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#F2F2F2").s().p("AgLAMQgFgFAAgHQAAgGAFgFQAFgFAGAAQAHAAAFAFQAFAFAAAGQAAAHgFAFQgFAFgHAAQgGAAgFgFg");
	this.shape_164.setTransform(491.875,262.375);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#F2F2F2").s().p("AASBHIgcgtIgLAMIAAAhIgYAAIAAiIIAYgFIAABQIAggmIAcAAIgiAmIAoA9g");
	this.shape_165.setTransform(484,256.5);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#F2F2F2").s().p("AgcAmQgOgOAAgYQAAgWAPgOQAOgOAZAAQARAAANAJIgKASQgIgJgOABQgMgBgHAKQgJAIABAOQAAAgAcAAQAOAAAJgIIAJARQgKAHgIACQgHABgLAAQgWAAgNgNg");
	this.shape_166.setTransform(473.35,258.65);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAYAAIAAA+QAAATARAAQAHAAAGgEQAIgEABgFIAAhEIAYAAIAABjIgYAAIAAgJQgEAFgJADQgIADgHAAQgiAAgBglg");
	this.shape_167.setTransform(462.9,258.725);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgxIgMAAIAAgTIAMAAIAAgUIAWgIIAAAcIAbAAIAAATIgbAAIAAArQAAALADAEQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgIg");
	this.shape_168.setTransform(453.525,257.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#F2F2F2").s().p("AgSAyIgQgHIAIgTQALAJANAAQAMAAAAgKQAAgFgEgEQgDgEgMgFQgZgJAAgTQAAgNAKgIQAKgGAOAAQAPgBAOAHIgGASQgIgHgOABQgLAAAAAKQAAADAEAEQAEADAMAEQAOAGAFAGQAGAIAAAKQAAAOgLAHQgKAJgQgBQgLABgFgCg");
	this.shape_169.setTransform(445.75,258.65);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgxIgMAAIAAgTIAMAAIAAgUIAWgIIAAAcIAbAAIAAATIgbAAIAAArQAAALADAEQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgIg");
	this.shape_170.setTransform(432.175,257.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#F2F2F2").s().p("AgiAmQgOgNAAgYQAAgXAPgOQAPgOATAAQAWAAAMAMQANANABAUIgCAMIhGAAQABAMAHAGQAHAHAMAAQAQAAAJgIIAJARQgNALgYgBQgWAAgNgNgAAZgKQgCgVgVAAQgUAAgEAVIAvAAIAAAAg");
	this.shape_171.setTransform(423,258.65);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#F2F2F2").s().p("AgrA7IAPgSQANALAOAAQAKAAAGgDQAHgCAAgGQAAgIgPgBIgKABIgMABQgYAAAAgQQAAgGAEgFQAEgEAFgCQgRgKAAgVQAAgPAMgLQAMgLARAAQAMAAAJAGIAJgLIAQAOIgLAIQAGAJAAAMQAAARgLAKQgKAJgPAAIgGAAIgEgBIgFADQgFACAAABQAAAEAHAAIAJgBIALgCQAiABAAAbQAAAPgNAJQgOAIgSAAQgXAAgTgOgAgOgqQgFAFAAAHQAAAJAFAGQAEAFAJAAQAHAAAEgFQAFgFAAgKQAAgHgFgFQgEgFgHgBQgIAAgFAGg");
	this.shape_172.setTransform(412.9,260.2);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAYAAIAAA+QAAATARAAQAHAAAGgEQAIgEABgFIAAhEIAYAAIAABjIgYAAIAAgJQgEAFgJADQgIADgHAAQgiAAgBglg");
	this.shape_173.setTransform(396.75,258.725);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgPQAOgNAUAAQAXAAAMANQANAOAAAXQAAAYgNAOQgNAOgWgBQgWABgMgOgAgQgXQgHAIAAAPQAAAhAXgBQALAAAGgIQAHgIAAgQQAAgggYAAQgKAAgGAJg");
	this.shape_174.setTransform(385.775,258.65);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_175.setTransform(375.325,260.575);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#F2F2F2").s().p("AgUBGIAAhPIgPAAIAAgUIAPAAQAAgSAKgLQAKgLAQAAQAIAAAMADIgHASQgIgDgEABQgGgBgFAHQgFAFAAAIIAAACIAVAAIAAAUIgUAAIAABPg");
	this.shape_176.setTransform(361.5,256.6);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#F2F2F2").s().p("AgGBFIAAhQIgMAAIAAgTIAjAAIAABjgAgDgtQgDgEgBgFQABgGADgEQADgEAFAAQAGAAAFAEQADAEAAAGQAAAFgDAEQgFAEgGAAQgFAAgDgEg");
	this.shape_177.setTransform(354.45,256.7);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#F2F2F2").s().p("AgqAOIAAhAIAWAAIAAA+QAAATASAAQAHAAAHgEQAGgEADgFIAAhEIAWAAIAABjIgWAAIAAgJQgGAFgIADQgHADgIAAQgjAAABglg");
	this.shape_178.setTransform(340.65,258.725);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgPQAOgNAUAAQAXAAAMANQANAOAAAXQAAAYgNAOQgNAOgWgBQgWABgMgOgAgQgXQgHAIAAAPQAAAhAXgBQALAAAGgIQAHgIAAgQQAAgggYAAQgKAAgGAJg");
	this.shape_179.setTransform(329.675,258.65);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_180.setTransform(319.225,260.575);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#F2F2F2").s().p("AgtBGIAAiKIAXAAIAAAHQAJgIANAAQAuAAAAA0QAAAXgNANQgNAOgWAAQgLAAgJgFIAAAqgAgWgrIAAAzQAGAGAJgBQAPAAAHgHQAHgHAAgQQAAgSgHgIQgHgGgPgBQgIAAgHAHg");
	this.shape_181.setTransform(303.125,260.5);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#F2F2F2").s().p("AgQAyIAAh0IAWgFIAABvQAAASALADQgFALgMAAQgQAAAAgWg");
	this.shape_182.setTransform(295.2,256.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#F2F2F2").s().p("AgiAmQgOgNAAgYQAAgXAPgOQAPgOATAAQAWAAANAMQANANgBAUIgBAMIhHAAQACAMAHAGQAIAHALAAQAQAAAJgIIAJARQgNALgYgBQgWAAgNgNgAAagKQgDgVgVAAQgUAAgFAVIAxAAIAAAAg");
	this.shape_183.setTransform(286.4,258.65);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#F2F2F2").s().p("AAVBHIAAg9QAAgKgGgEQgGgGgJAAQgFAAgGAEQgGADgCADIAABHIgYAAIAAiIIAYgFIAAAxQAJgIAPAAQASAAALAKQAKALAAASIAAA9g");
	this.shape_184.setTransform(275.325,256.5);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgPQAOgNAUAAQAXAAAMANQANAOAAAXQAAAYgNAOQgNAOgWgBQgWABgMgOgAgQgXQgHAIAAAPQAAAhAXgBQALAAAGgIQAHgIAAgQQAAgggYAAQgKAAgGAJg");
	this.shape_185.setTransform(258.625,258.65);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgxIgMAAIAAgTIAMAAIAAgUIAWgIIAAAcIAbAAIAAATIgbAAIAAArQAAALADAEQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgIg");
	this.shape_186.setTransform(249.475,257.3);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#F2F2F2").s().p("AgiAmQgNgNAAgYQAAgXAOgOQAOgOAUAAQAVAAANAMQAOANAAAUIgDAMIhGAAQACAMAHAGQAHAHAMAAQAQAAAIgIIAJARQgMALgZgBQgVAAgNgNgAAZgKQgCgVgWAAQgSAAgFAVIAvAAIAAAAg");
	this.shape_187.setTransform(234.6,258.65);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#F2F2F2").s().p("AgQAyIAAh0IAWgFIAABvQAAASALADQgFALgMAAQgQAAAAgWg");
	this.shape_188.setTransform(226.9,256.6);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#F2F2F2").s().p("AgaBBIgGAHIgNAAIAAiKIAXgFIAAAvQAKgGALAAQAUAAAOAOQANAOAAAUQAAAZgNAPQgOAOgWAAQgNAAgKgHgAgWgFIAAAzQAGAGAIAAQAQAAAHgIQAHgIAAgRQAAgegcAAQgKABgGAFg");
	this.shape_189.setTransform(218.2,256.6);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgEQgEAFgHADQgHADgJAAQgQABgJgJQgJgHAAgPQAAgSANgIQANgKAXAAIAJABQAAgRgVAAQgNgBgJAFIgFgSQAMgGARABQAVAAALAKQAKAKAAAdIAAAUQAAAUAIAFQgCAFgEABQgEACgEgBQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgagBAAATg");
	this.shape_190.setTransform(207.575,258.65);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#F2F2F2").s().p("AgiAmQgNgNAAgYQAAgXAOgOQAOgOAUAAQAVAAANAMQANANAAAUIgCAMIhGAAQABAMAIAGQAHAHAMAAQAQAAAIgIIAJARQgMALgZgBQgVAAgNgNgAAagKQgDgVgWAAQgSAAgGAVIAxAAIAAAAg");
	this.shape_191.setTransform(191.3,258.65);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#F2F2F2").s().p("AgbBBIgFAHIgNAAIAAiKIAYgFIAAAvQAIgGAMAAQAUAAAOAOQANAOAAAUQAAAZgNAPQgOAOgWAAQgNAAgLgHgAgVgFIAAAzQAEAGAJAAQAQAAAHgIQAHgIAAgRQAAgegcAAQgLABgEAFg");
	this.shape_192.setTransform(180.5,256.6);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgxIgMAAIAAgTIAMAAIAAgUIAWgIIAAAcIAbAAIAAATIgbAAIAAArQAAALADAEQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgIg");
	this.shape_193.setTransform(165.375,257.3);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#F2F2F2").s().p("AAVAzIAAg5QgBgMgFgHQgEgFgLAAQgFAAgFACQgGAEgEAEIAABHIgWAAIAAhjIAQAAIAFAKQAJgLARAAQASAAAKAKQALALgBASIAAA9g");
	this.shape_194.setTransform(156.05,258.55);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgPQAOgNAUAAQAXAAAMANQANAOAAAXQAAAYgNAOQgNAOgWgBQgWABgMgOgAgQgXQgHAIAAAPQAAAhAXgBQALAAAGgIQAHgIAAgQQAAgggYAAQgKAAgGAJg");
	this.shape_195.setTransform(145.075,258.65);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#F2F2F2").s().p("AAbAzIgbg8IgaA8IgJAAIglhlIAYAAIAUA7IAZg7IAHAAIAZA7IAWg7IAWAAIglBlg");
	this.shape_196.setTransform(132.275,258.725);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#F2F2F2").s().p("AgiAmQgOgNAAgYQAAgXAPgOQAPgOATAAQAWAAANAMQANANgBAUIgCAMIhGAAQABAMAIAGQAHAHAMAAQAQAAAIgIIAJARQgMALgYgBQgWAAgNgNgAAagKQgDgVgWAAQgSAAgGAVIAxAAIAAAAg");
	this.shape_197.setTransform(113.7,258.65);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#F2F2F2").s().p("AAbAzIgbg8IgaA8IgJAAIglhlIAYAAIAUA7IAZg7IAHAAIAZA7IAWg7IAWAAIglBlg");
	this.shape_198.setTransform(100.825,258.725);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#F2F2F2").s().p("AghA6QgMgNAAgXQAAgWAOgPQAOgPATAAQALAAAKAFIAAgpIAXgFIAACNIgXAAIAAgGQgDADgHACQgHADgGAAQgVAAgMgOgAgNgCQgIAHAAAQQAAAfAdAAIAIgCQAFgBACgCIAAg0QgIgFgIgBQgNAAgHAJg");
	this.shape_199.setTransform(82.075,256.6);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#F2F2F2").s().p("AAVAzIAAg5QAAgMgGgHQgEgFgLAAQgFAAgFACQgGAEgEAEIAABHIgWAAIAAhjIAQAAIAEAKQAKgLARAAQASAAAKAKQAKALAAASIAAA9g");
	this.shape_200.setTransform(71.1,258.55);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgEQgEAFgHADQgHADgJAAQgQABgJgJQgJgHAAgPQAAgSANgIQANgKAXAAIAJABQAAgRgVAAQgNgBgJAFIgFgSQAMgGARABQAVAAALAKQAKAKAAAdIAAAUQAAAUAIAFQgCAFgEABQgEACgEgBQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgagBAAATg");
	this.shape_201.setTransform(60.525,258.65);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#F2F2F2").s().p("AgVBGIAAhPIgOAAIAAgUIAPAAQAAgRALgMQAJgLAQAAQAIAAAMADIgHASQgHgCgFAAQgHAAgEAFQgEAGgBAIIAAACIAVAAIAAAUIgUAAIAABPg");
	this.shape_202.setTransform(519.15,232.55);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#F2F2F2").s().p("AgQAyIAAh0IAWgFIAABvQAAASALADQgFALgMAAQgQAAAAgWg");
	this.shape_203.setTransform(513,232.55);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#F2F2F2").s().p("AgiAmQgOgNAAgYQAAgWAPgPQAPgPATAAQAWAAANANQANANgBAUIgBAMIhHAAQACAMAHAGQAIAHALAAQAQAAAJgIIAJASQgNAKgYAAQgWAAgNgOgAAagJQgDgXgVABQgUgBgFAXIAxAAIAAAAg");
	this.shape_204.setTransform(504.2,234.6);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#F2F2F2").s().p("AgSAyIgQgHIAIgSQALAIANAAQAMAAAAgKQAAgGgDgDQgEgEgMgEQgZgKAAgUQAAgNAKgHQAJgGAPgBQAQAAANAHIgGASQgIgHgOAAQgLAAAAALQAAADAEADQAEAEAMAEQANAGAGAGQAGAIAAAKQAAANgKAIQgLAJgQAAQgLgBgFgBg");
	this.shape_205.setTransform(494.7,234.6);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#F2F2F2").s().p("AghAzIAAhjIAXAAIAAAJQAKgLAPAAQAMAAAHAEIgKAUQgHgFgHABQgIgBgFAIQgHAHAAALIAAA4g");
	this.shape_206.setTransform(487.125,234.5);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#F2F2F2").s().p("AgqAOIAAhAIAWAAIAAA+QAAATASAAQAHAAAHgEQAHgEACgFIAAhEIAWAAIAABjIgWAAIAAgJQgGAFgIADQgIADgHAAQgjAAABglg");
	this.shape_207.setTransform(476.9,234.675);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgPQAOgOAUAAQAXAAAMAOQANANAAAYQAAAXgNAOQgNAOgWABQgWgBgMgOgAgQgYQgHAKAAAOQAAAhAXAAQALAAAGgJQAHgIAAgQQAAgggYAAQgKAAgGAIg");
	this.shape_208.setTransform(465.925,234.6);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_209.setTransform(455.475,236.525);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgTIAMAAIAAgTIAWgJIAAAcIAbAAIAAATIgbAAIAAArQAAAKADAFQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgJg");
	this.shape_210.setTransform(440.975,233.25);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#F2F2F2").s().p("AgGBFIAAhQIgMAAIAAgTIAjAAIAABjgAgDgtQgDgEAAgGQAAgFADgEQADgEAFAAQAGAAAFAEQADAEAAAFQAAAGgDAEQgFAEgGAAQgFAAgDgEg");
	this.shape_211.setTransform(434.1,232.65);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#F2F2F2").s().p("AgiAmQgNgNAAgYQAAgWAOgPQAOgPAUAAQAVAAANANQAOANAAAUIgDAMIhGAAQACAMAHAGQAHAHAMAAQAQAAAIgIIAJASQgMAKgZAAQgVAAgNgOgAAZgJQgCgXgWABQgSgBgFAXIAvAAIAAAAg");
	this.shape_212.setTransform(420.45,234.6);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#F2F2F2").s().p("AgcAmQgNgNgBgZQABgWAOgOQAPgPAYAAQARAAANAKIgKARQgIgHgOAAQgMAAgHAJQgIAIAAAOQAAAgAcAAQANAAAKgIIAIASQgJAGgIACQgIACgKAAQgWAAgNgOg");
	this.shape_213.setTransform(410.15,234.6);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#F2F2F2").s().p("AAVAzIAAg5QAAgMgGgHQgFgFgKAAQgFAAgFADQgGACgEAFIAABHIgWAAIAAhjIAQAAIAEAKQAKgMARAAQASAAAKALQAKAKAAAUIAAA8g");
	this.shape_214.setTransform(399.7,234.5);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F2F2F2").s().p("AAWAvQgEgDgBgEQgEAFgHADQgHADgJABQgQAAgJgJQgJgHAAgQQAAgRANgJQANgJAXAAIAJABQAAgRgVAAQgNgBgJAFIgFgSQAMgGARAAQAVAAALALQAKAKAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEABQgFAAgEgFgAgVATQAAAOAPAAQAUAAAAgVIAAgKIgJgBQgaAAAAASg");
	this.shape_215.setTransform(389.125,234.6);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#F2F2F2").s().p("AAUAzIAAg5QAAgMgEgHQgGgFgKAAQgEAAgGADQgGACgDAFIAABHIgYAAIAAhjIARAAIAEAKQAKgMASAAQARAAALALQAJAKABAUIAAA8g");
	this.shape_216.setTransform(378.4,234.5);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#F2F2F2").s().p("AgFBFIAAhQIgNAAIAAgTIAjAAIAABjgAgDgtQgDgEAAgGQAAgFADgEQADgEAFAAQAHAAADAEQAEAEAAAFQAAAGgEAEQgDAEgHAAQgFAAgDgEg");
	this.shape_217.setTransform(369.65,232.65);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#F2F2F2").s().p("AgVBGIAAhPIgOAAIAAgUIAPAAQABgRAJgMQAKgLAPAAQAJAAAMADIgHASQgHgCgFAAQgHAAgEAFQgFAGABAIIAAACIAUAAIAAAUIgUAAIAABPg");
	this.shape_218.setTransform(364.05,232.55);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgPQAOgOAUAAQAXAAAMAOQANANAAAYQAAAXgNAOQgNAOgWABQgWgBgMgOgAgQgYQgHAKAAAOQAAAhAXAAQALAAAGgJQAHgIAAgQQAAgggYAAQgKAAgGAIg");
	this.shape_219.setTransform(349.075,234.6);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgTIAMAAIAAgTIAWgJIAAAcIAbAAIAAATIgbAAIAAArQAAAKADAFQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgJg");
	this.shape_220.setTransform(339.925,233.25);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#F2F2F2").s().p("AgiAmQgNgNAAgYQAAgWAOgPQAOgPAUAAQAVAAANANQAOANAAAUIgDAMIhGAAQABAMAIAGQAHAHAMAAQAQAAAIgIIAJASQgMAKgZAAQgVAAgNgOgAAagJQgDgXgWABQgSgBgFAXIAwAAIAAAAg");
	this.shape_221.setTransform(325.05,234.6);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#F2F2F2").s().p("AgDAzIgthlIAZAAIAXA8IAZg8IAZAAIgvBlg");
	this.shape_222.setTransform(314.6,234.675);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#F2F2F2").s().p("AAWAvQgEgDgBgEQgEAFgHADQgHADgJABQgQAAgJgJQgJgHAAgQQAAgRANgJQANgJAXAAIAJABQAAgRgVAAQgNgBgJAFIgFgSQAMgGARAAQAVAAALALQAKAKAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEABQgFAAgEgFgAgVATQAAAOAPAAQAUAAAAgVIAAgKIgJgBQgaAAAAASg");
	this.shape_223.setTransform(304.625,234.6);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#F2F2F2").s().p("AAVBHIAAg9QAAgJgGgFQgGgFgJgBQgFAAgGADQgGAEgCADIAABHIgYAAIAAiIIAYgFIAAAxQAJgIAPAAQASAAALAKQAKAKAAATIAAA9g");
	this.shape_224.setTransform(293.875,232.45);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_225.setTransform(277.475,236.525);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#F2F2F2").s().p("AAWAvQgEgDgBgEQgEAFgHADQgHADgJABQgQAAgJgJQgJgHAAgQQAAgRANgJQANgJAXAAIAJABQAAgRgVAAQgNgBgJAFIgFgSQAMgGARAAQAVAAALALQAKAKAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEABQgFAAgEgFgAgVATQAAAOAPAAQAUAAAAgVIAAgKIgJgBQgaAAAAASg");
	this.shape_226.setTransform(267.475,234.6);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#F2F2F2").s().p("AAuAzIAAg+QAAgTgSAAQgFAAgFADQgFADgCAEIAABHIgWAAIAAhCQAAgGgEgFQgFgFgIABQgEAAgGADQgFADgCAEIAABHIgXAAIAAhjIAQAAIAEAJQAKgLAPAAQAUAAAJALQAFgFAHgCQAIgDAIgBQARAAAJAKQAJAKAAAQIAABBg");
	this.shape_227.setTransform(254.225,234.5);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAYAAIAAA+QAAATARAAQAHAAAGgEQAIgEABgFIAAhEIAYAAIAABjIgYAAIAAgJQgEAFgJADQgIADgHAAQgiAAgBglg");
	this.shape_228.setTransform(234.75,234.675);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgPQAOgOAUAAQAXAAAMAOQANANAAAYQAAAXgNAOQgNAOgWABQgWgBgMgOgAgQgYQgHAKAAAOQAAAhAXAAQALAAAGgJQAHgIAAgQQAAgggYAAQgKAAgGAIg");
	this.shape_229.setTransform(223.775,234.6);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_230.setTransform(213.325,236.525);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#F2F2F2").s().p("AgLBEIAAiHIAXAAIAACHg");
	this.shape_231.setTransform(200,232.75);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#F2F2F2").s().p("AgtBFIAAiHIAngCQAUABAMAIQAMAKAAAQQAAARgRAJQAZAHAAAcQAAATgOAKQgOAMgVAAgAgVADIAAAtIAMABQAPAAAIgFQAHgGAAgMQAAgNgHgEQgHgGgQAAgAgVgvIAAAgIAMABQAXAAAAgSQAAgPgVAAg");
	this.shape_232.setTransform(192.025,232.7);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_233.setTransform(175.275,236.525);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#F2F2F2").s().p("AgaBBIgGAHIgNAAIAAiKIAXgFIAAAvQAKgGAKAAQAVAAANANQAOAOAAAVQAAAZgOAPQgNAOgWAAQgOAAgJgHgAgWgEIAAAyQAGAGAIAAQAQAAAHgIQAHgIAAgSQAAgdgcAAQgKAAgGAHg");
	this.shape_234.setTransform(164.9,232.55);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#F2F2F2").s().p("AghA7QgMgNAAgYQAAgWAOgPQAOgPATAAQALAAAKAEIAAgoIAXgFIAACNIgXAAIAAgGQgDADgHACQgHADgGAAQgVAAgMgNgAgNgCQgIAHAAARQAAAeAdAAIAIgCQAFgBACgCIAAgzQgIgHgIAAQgNAAgHAJg");
	this.shape_235.setTransform(147.925,232.55);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#F2F2F2").s().p("AgiAmQgOgNAAgYQAAgWAPgPQAPgPATAAQAWAAANANQANANgBAUIgBAMIhHAAQABAMAIAGQAHAHAMAAQAQAAAIgIIAJASQgMAKgYAAQgWAAgNgOgAAagJQgDgXgVABQgTgBgGAXIAxAAIAAAAg");
	this.shape_236.setTransform(137.1,234.6);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgTIAMAAIAAgTIAWgJIAAAcIAbAAIAAATIgbAAIAAArQAAAKADAFQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgJg");
	this.shape_237.setTransform(127.875,233.25);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#F2F2F2").s().p("AghAzIAAhjIAXAAIAAAJQAKgLAPAAQAMAAAHAEIgKAUQgHgFgHABQgIgBgFAIQgHAHAAALIAAA4g");
	this.shape_238.setTransform(120.675,234.5);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgPQAOgOAUAAQAXAAAMAOQANANAAAYQAAAXgNAOQgNAOgWABQgWgBgMgOgAgQgYQgHAKAAAOQAAAhAXAAQALAAAGgJQAHgIAAgQQAAgggYAAQgKAAgGAIg");
	this.shape_239.setTransform(110.675,234.6);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#F2F2F2").s().p("AgtBGIAAiKIAXAAIAAAIQAJgJANAAQAuAAAAA0QAAAYgNANQgNANgWAAQgLAAgJgEIAAApgAgWgrIAAAzQAGAGAJgBQAPABAHgJQAHgGAAgQQAAgSgHgHQgHgIgPAAQgIABgHAGg");
	this.shape_240.setTransform(99.925,236.45);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#F2F2F2").s().p("AgtBGIAAiKIAXAAIAAAIQAJgJANAAQAuAAAAA0QAAAYgNANQgNANgWAAQgLAAgJgEIAAApgAgWgrIAAAzQAGAGAJgBQAPABAHgJQAHgGAAgQQAAgSgHgHQgHgIgPAAQgIABgHAGg");
	this.shape_241.setTransform(88.875,236.45);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#F2F2F2").s().p("AgqAOIAAhAIAWAAIAAA+QABATARAAQAHAAAHgEQAHgEACgFIAAhEIAXAAIAABjIgXAAIAAgJQgFAFgJADQgIADgHAAQgiAAAAglg");
	this.shape_242.setTransform(77.6,234.675);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#F2F2F2").s().p("AgSAyIgPgHIAIgSQAKAIANAAQANAAAAgKQAAgGgFgDQgEgEgLgEQgZgKAAgUQAAgNAKgHQAKgGAOgBQAPAAAOAHIgHASQgHgHgNAAQgMAAAAALQAAADAEADQAEAEAMAEQAOAGAFAGQAGAIAAAKQAAANgLAIQgKAJgRAAQgKgBgFgBg");
	this.shape_243.setTransform(67.95,234.6);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgTIAMAAIAAgTIAWgJIAAAcIAbAAIAAATIgbAAIAAArQAAAKADAFQAEAFAIgBQAIAAAIgEIAAAVQgIADgPAAQgOAAgIgJg");
	this.shape_244.setTransform(54.375,233.25);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgPQAOgOAUAAQAXAAAMAOQANANAAAYQAAAXgNAOQgNAOgWABQgWgBgMgOgAgQgYQgHAKAAAOQAAAhAXAAQALAAAGgJQAHgIAAgQQAAgggYAAQgKAAgGAIg");
	this.shape_245.setTransform(45.275,234.6);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#F2F2F2").s().p("AAVAzIAAg5QAAgMgGgHQgFgFgKAAQgFAAgFADQgGACgEAFIAABHIgWAAIAAhjIAQAAIAEAKQAKgMARAAQASAAAKALQAKAKAAAUIAAA8g");
	this.shape_246.setTransform(34.3,234.5);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#F2F2F2").s().p("AgQAyIAAhzIAWgGIAABvQAAASALADQgFALgMAAQgQAAAAgWg");
	this.shape_247.setTransform(516.4,208.5);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_248.setTransform(507.675,210.55);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_249.setTransform(496.925,210.55);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgSIAMAAIAAgUIAWgJIAAAdIAbAAIAAASIgbAAIAAArQAAALADAEQAEAEAIABQAIAAAIgGIAAAWQgIADgPAAQgOAAgIgJg");
	this.shape_250.setTransform(487.775,209.2);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#F2F2F2").s().p("AAWAvQgEgDgBgFQgEAGgHADQgHAEgJAAQgQgBgJgHQgJgJAAgPQAAgQANgKQANgJAXAAIAJABQAAgSgVAAQgNAAgJAFIgFgSQAMgFARgBQAVABALAJQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEACgEAAQgFAAgEgFgAgVATQAAAOAPAAQAUAAAAgVIAAgKIgJgBQgaABAAARg");
	this.shape_251.setTransform(473.375,210.55);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQABgXAOgOQAOgPAUAAQAWAAAMANQANANABAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgIIAJASQgNAJgZABQgVAAgNgOgAAZgJQgCgXgVAAQgUAAgEAXIAvAAIAAAAg");
	this.shape_252.setTransform(457.1,210.55);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#F2F2F2").s().p("AgSAyIgQgHIAJgSQAKAIANAAQAMAAAAgKQAAgFgDgEQgFgDgKgFQgagKAAgUQAAgMAKgIQAJgHAPAAQAPABAOAGIgHASQgHgGgOgBQgLABAAAJQAAAEAEADQAEAEAMAEQANAFAGAHQAGAIAAAJQAAAOgKAJQgKAHgSABQgJAAgGgCg");
	this.shape_253.setTransform(447.6,210.55);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_254.setTransform(438.125,210.55);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_255.setTransform(427.375,210.55);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#F2F2F2").s().p("AAVBHIAAg9QAAgKgGgEQgGgFgJAAQgFAAgGACQgGADgCAEIAABHIgYAAIAAiHIAYgGIAAAxQAJgIAPAAQASAAALAKQAKAKAAATIAAA9g");
	this.shape_256.setTransform(416.375,208.4);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#F2F2F2").s().p("AgcAmQgNgNAAgZQAAgWAOgOQAOgPAZAAQARAAANAKIgKARQgIgHgOgBQgMABgIAIQgHAJgBAOQABAgAdAAQANAAAJgIIAIASQgKAGgHABQgHADgLAAQgWAAgNgOg");
	this.shape_257.setTransform(405.9,210.55);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAYAAIAAA+QAAATARAAQAHAAAGgEQAIgEABgFIAAhEIAYAAIAABjIgYAAIAAgJQgEAFgJADQgHADgIAAQgjAAAAglg");
	this.shape_258.setTransform(389.75,210.625);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_259.setTransform(378.775,210.55);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_260.setTransform(368.325,212.475);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#F2F2F2").s().p("AgUBGIAAhPIgPAAIAAgTIAPAAQAAgSAKgMQAKgLAPAAQAJAAAMAEIgHARQgHgDgFAAQgHABgEAFQgFAGABAIIAAADIAUAAIAAATIgUAAIAABPg");
	this.shape_261.setTransform(354.5,208.5);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#F2F2F2").s().p("AgGBFIAAhQIgMAAIAAgSIAjAAIAABigAgDgtQgDgEgBgGQABgFADgEQADgEAGAAQAFAAAFAEQADAEAAAFQAAAGgDAEQgFAEgFAAQgGAAgDgEg");
	this.shape_262.setTransform(347.45,208.6);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#F2F2F2").s().p("AgSAUQARgMAAgIIgCgFQgJgDAAgJQAAgFAFgDQAEgEAGAAQAHAAAFAEQAEAFAAAHQAAAMgFAJQgGAJgSANg");
	this.shape_263.setTransform(335.425,215.95);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgFgHAAQgIAAgFAIQgHAHAAALIAAA3g");
	this.shape_264.setTransform(330.975,210.45);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#F2F2F2").s().p("AgiAmQgNgOAAgXQAAgXAOgOQAOgPAUAAQAVAAANANQANANAAAUIgCAMIhGAAQABAMAIAHQAHAGAMAAQAQAAAIgIIAJASQgMAJgZABQgVAAgNgOgAAagJQgDgXgWAAQgSAAgGAXIAxAAIAAAAg");
	this.shape_265.setTransform(320.9,210.55);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#F2F2F2").s().p("AgEAzIgthlIAaAAIAXA8IAZg8IAYAAIguBlg");
	this.shape_266.setTransform(310.45,210.625);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgXAPgOQAPgPATAAQAWAAANANQANANgBAUIgCAMIhGAAQABAMAIAHQAHAGAMAAQAQAAAJgIIAJASQgNAJgYABQgWAAgNgOgAAagJQgDgXgWAAQgSAAgGAXIAxAAIAAAAg");
	this.shape_267.setTransform(300,210.55);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#F2F2F2").s().p("AAbAzIgbg8IgaA8IgJAAIglhlIAYAAIAUA7IAZg7IAHAAIAZA7IAWg7IAWAAIglBlg");
	this.shape_268.setTransform(287.125,210.625);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_269.setTransform(274.325,210.55);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#F2F2F2").s().p("AAbBEIAAg9Ig1AAIAAA9IgYAAIAAiHIAYAAIAAA2IA1AAIAAg2IAYAAIAACHg");
	this.shape_270.setTransform(262.5,208.7);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#F2F2F2").s().p("AgLAMQgFgFAAgHQAAgGAFgFQAFgFAGAAQAHAAAFAFQAFAFAAAGQAAAHgFAFQgFAFgHAAQgGAAgFgFg");
	this.shape_271.setTransform(246.625,214.275);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgXAPgOQAPgPATAAQAWAAANANQANANgBAUIgBAMIhHAAQABAMAIAHQAHAGAMAAQAQAAAIgIIAJASQgMAJgYABQgWAAgNgOgAAagJQgDgXgVAAQgTAAgGAXIAxAAIAAAAg");
	this.shape_272.setTransform(237.9,210.55);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#F2F2F2").s().p("AgcAmQgNgNAAgZQAAgWAOgOQAOgPAZAAQARAAANAKIgKARQgIgHgOgBQgMABgIAIQgHAJgBAOQAAAgAeAAQANAAAJgIIAIASQgKAGgHABQgIADgKAAQgWAAgNgOg");
	this.shape_273.setTransform(227.6,210.55);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#F2F2F2").s().p("AAVAyIAAg4QgBgNgFgGQgEgFgLgBQgEAAgGAEQgGADgEADIAABHIgXAAIAAhiIARAAIAFAJQAJgKASgBQARAAAKALQALAKgBAUIAAA7g");
	this.shape_274.setTransform(217.15,210.45);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgXAPgOQAPgPATAAQAVAAANANQANANABAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgIIAJASQgNAJgYABQgWAAgNgOgAAZgJQgCgXgVAAQgUAAgEAXIAvAAIAAAAg");
	this.shape_275.setTransform(206.1,210.55);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgFgHAAQgIAAgFAIQgHAHAAALIAAA3g");
	this.shape_276.setTransform(197.175,210.45);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#F2F2F2").s().p("AgiAmQgNgOAAgXQgBgXAPgOQAOgPAUAAQAWAAAMANQANANABAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgIIAJASQgNAJgZABQgVAAgNgOgAAZgJQgCgXgVAAQgUAAgEAXIAvAAIAAAAg");
	this.shape_277.setTransform(187.1,210.55);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#F2F2F2").s().p("AgVBGIAAhPIgOAAIAAgTIAPAAQAAgSAKgMQAKgLAPAAQAJAAAMAEIgHARQgHgDgFAAQgHABgEAFQgFAGABAIIAAADIAUAAIAAATIgUAAIAABPg");
	this.shape_278.setTransform(178.55,208.5);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgXAPgOQAPgPATAAQAWAAAMANQANANABAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgIIAJASQgNAJgYABQgWAAgNgOgAAZgJQgCgXgVAAQgUAAgEAXIAvAAIAAAAg");
	this.shape_279.setTransform(169.2,210.55);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgFgHAAQgIAAgFAIQgHAHAAALIAAA3g");
	this.shape_280.setTransform(160.275,210.45);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#F2F2F2").s().p("AgtBGIAAiJIAXAAIAAAHQAJgJANAAQAuAAAAA0QAAAYgNANQgNANgWAAQgLAAgJgEIAAApgAgWgrIAAAzQAGAFAJAAQAPABAHgJQAHgGAAgRQAAgRgHgHQgHgIgPABQgIAAgHAGg");
	this.shape_281.setTransform(150.275,212.4);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#F2F2F2").s().p("AAVAyIAAg4QAAgNgGgGQgFgFgKgBQgFAAgFAEQgGADgEADIAABHIgWAAIAAhiIAQAAIAEAJQAKgKARgBQASAAAKALQAKAKAAAUIAAA7g");
	this.shape_282.setTransform(133.3,210.45);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#F2F2F2").s().p("AAbAzIgbg8IgaA8IgJAAIglhlIAYAAIAUA7IAZg7IAHAAIAZA7IAWg7IAWAAIglBlg");
	this.shape_283.setTransform(120.275,210.625);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_284.setTransform(107.475,210.55);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgFgHAAQgIAAgFAIQgHAHAAALIAAA3g");
	this.shape_285.setTransform(92.925,210.45);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#F2F2F2").s().p("AgqAOIAAhAIAWAAIAAA+QAAATASAAQAHAAAHgEQAHgEACgFIAAhEIAWAAIAABjIgWAAIAAgJQgGAFgIADQgIADgHAAQgjAAABglg");
	this.shape_286.setTransform(82.7,210.625);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_287.setTransform(71.725,210.55);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#F2F2F2").s().p("AglAxQAbAAAAgOQAAgJgIgSIgfhMIAYAAIAaBEIAZhEIAYAAIgsByQgDAKgMAHQgMAGgQAAg");
	this.shape_288.setTransform(61.275,212.475);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#F2F2F2").s().p("AgiAlQgNgOAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAYgNANQgNAPgWAAQgWAAgMgPgAgQgYQgHAKAAAOQAAAgAXABQALAAAGgJQAHgJAAgPQAAgggYAAQgKAAgGAIg");
	this.shape_289.setTransform(45.175,210.55);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#F2F2F2").s().p("AgMA4QgIgIAAgPIAAgyIgMAAIAAgSIAMAAIAAgUIAWgJIAAAdIAbAAIAAASIgbAAIAAArQAAALADAEQAEAEAIABQAIAAAIgGIAAAWQgIADgPAAQgOAAgIgJg");
	this.shape_290.setTransform(36.025,209.2);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#F2F2F2").s().p("AgqA8IAOgSQAMAKAPABQAJAAAHgEQAGgDABgEQAAgJgPAAIgKABIgMABQgYgBAAgQQAAgFAEgFQAEgFAFgDQgRgKAAgTQAAgRAMgKQAMgLAQAAQANABAJAFIAJgLIAQAOIgLAIQAGAKAAAMQAAAQgKALQgLAIgPABIgGgBIgEAAIgFACQgFABAAACQAAAFAHAAIAJgCIALgCQAiAAAAAcQAAAPgNAIQgOAJgSAAQgXAAgSgNgAgOgrQgFAFAAAJQAAAIAFAFQAEAGAJAAQAHAAAFgFQAEgGAAgIQAAgIgFgFQgFgGgGABQgIAAgFAEg");
	this.shape_291.setTransform(525.95,188.05);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#F2F2F2").s().p("AAVAyIAAg4QgBgNgFgFQgEgHgLAAQgEAAgGADQgGAEgDADIAABHIgYAAIAAhiIARAAIAFAJQAJgLASAAQARAAAKALQALAKgBATIAAA8g");
	this.shape_292.setTransform(515.5,186.4);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#F2F2F2").s().p("AgGBFIAAhPIgMAAIAAgTIAjAAIAABigAgDgtQgDgEgBgFQABgGADgEQADgEAGAAQAFAAAFAEQADAEAAAGQAAAFgDAEQgFAEgFAAQgGAAgDgEg");
	this.shape_293.setTransform(506.75,184.55);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#F2F2F2").s().p("AghA6QgMgNAAgXQAAgXAOgPQAOgOATAAQALAAAKAFIAAgoIAXgGIAACNIgXAAIAAgGQgDADgHADQgHACgGAAQgVAAgMgOgAgNgCQgIAIAAAPQAAAgAdAAIAIgCQAFgDACgCIAAgzQgIgFgIAAQgNgBgHAJg");
	this.shape_294.setTransform(498.625,184.45);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgEgHgBQgIABgFAHQgHAIAAAKIAAA3g");
	this.shape_295.setTransform(489.775,186.4);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_296.setTransform(479.775,186.5);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#F2F2F2").s().p("AgcAmQgOgNAAgYQAAgXAPgOQAPgPAYAAQARAAANAKIgKASQgIgJgOAAQgMAAgHAJQgIAJAAAPQAAAfAcAAQANAAAKgJIAIASQgJAHgIABQgIACgKAAQgWAAgNgNg");
	this.shape_297.setTransform(469.55,186.5);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#F2F2F2").s().p("AgcAmQgOgNAAgYQAAgXAPgOQAOgPAZAAQARAAANAKIgKASQgIgJgOAAQgMAAgHAJQgJAJABAPQAAAfAcAAQAOAAAJgJIAJASQgKAHgIABQgHACgLAAQgWAAgNgNg");
	this.shape_298.setTransform(459.85,186.5);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgFQgEAGgHADQgHADgJAAQgQAAgJgHQgJgJAAgOQAAgRANgKQANgJAXAAIAJABQAAgSgVAAQgNABgJAEIgFgSQAMgFARgBQAVAAALAKQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEAAQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgaAAAAASg");
	this.shape_299.setTransform(450.025,186.5);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#F2F2F2").s().p("AgSAyIgPgHIAIgTQAKAJANAAQANAAAAgKQgBgGgEgDQgEgDgLgGQgZgJAAgTQAAgOAKgGQAKgIAOAAQAPABAOAGIgHASQgHgGgNgBQgMAAAAAKQAAAEAEAEQAEACAMAGQAOAEAFAHQAGAHAAAKQAAAOgLAJQgKAHgRAAQgKAAgFgBg");
	this.shape_300.setTransform(435.15,186.5);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#F2F2F2").s().p("AgQAyIAAhzIAWgGIAABvQAAASALAEQgFAKgMAAQgQAAAAgWg");
	this.shape_301.setTransform(428.8,184.45);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgFQgEAGgHADQgHADgJAAQgQAAgJgHQgJgJAAgOQAAgRANgKQANgJAXAAIAJABQAAgSgVAAQgNABgJAEIgFgSQAMgFARgBQAVAAALAKQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEAAQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgaAAAAASg");
	this.shape_302.setTransform(420.475,186.5);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#F2F2F2").s().p("AgFBFIAAhPIgNAAIAAgTIAjAAIAABigAgDgtQgEgEABgFQgBgGAEgEQADgEAFAAQAHAAADAEQAEAEAAAGQAAAFgEAEQgDAEgHAAQgFAAgDgEg");
	this.shape_303.setTransform(412.2,184.55);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgEgHgBQgIABgFAHQgHAIAAAKIAAA3g");
	this.shape_304.setTransform(406.225,186.4);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#F2F2F2").s().p("AgiAmQgNgOAAgXQAAgWAOgPQAOgPAUAAQAVAAANANQAOANAAAUIgDAMIhGAAQACAMAHAHQAHAGAMAAQAQAAAIgJIAJASQgMAKgZAAQgVAAgNgNgAAZgJQgCgXgWAAQgSAAgFAXIAvAAIAAAAg");
	this.shape_305.setTransform(396.15,186.5);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgwIgMAAIAAgTIAMAAIAAgVIAWgIIAAAdIAbAAIAAATIgbAAIAAAqQAAAKADAFQAEAEAIABQAIAAAIgGIAAAWQgIADgPAAQgOAAgIgIg");
	this.shape_306.setTransform(386.925,185.15);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgFQgEAGgHADQgHADgJAAQgQAAgJgHQgJgJAAgOQAAgRANgKQANgJAXAAIAJABQAAgSgVAAQgNABgJAEIgFgSQAMgFARgBQAVAAALAKQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEAAQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgaAAAAASg");
	this.shape_307.setTransform(378.225,186.5);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#F2F2F2").s().p("AAuAyIAAg9QAAgUgSAAQgFAAgFADQgFAEgCAEIAABGIgWAAIAAhAQAAgIgEgEQgFgEgIgBQgEABgGADQgFADgCAEIAABGIgXAAIAAhiIAQAAIAEAJQAKgLAPAAQAUAAAJALQAFgFAHgDQAIgDAIAAQARAAAJAKQAJAJAAARIAABAg");
	this.shape_308.setTransform(364.975,186.4);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#F2F2F2").s().p("AgrA8IAQgSQAMAKAPABQAJAAAGgEQAHgDgBgEQAAgJgOAAIgLABIgLABQgYgBAAgQQAAgFAEgFQAEgFAFgDQgRgKAAgTQAAgRAMgKQALgLASAAQAMABAJAFIAJgLIAQAOIgLAIQAGAKAAAMQAAAQgLALQgKAIgQABIgGgBIgDAAIgFACQgEABgBACQABAFAGAAIAKgCIAKgCQAiAAAAAcQAAAPgOAIQgNAJgSAAQgXAAgTgNgAgOgrQgFAFAAAJQAAAIAEAFQAGAGAIAAQAHAAAEgFQAFgGAAgIQAAgIgFgFQgFgGgGABQgIAAgFAEg");
	this.shape_309.setTransform(346.45,188.05);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#F2F2F2").s().p("AAUAyIAAg4QAAgNgEgFQgGgHgKAAQgEAAgGADQgGAEgDADIAABHIgYAAIAAhiIARAAIAEAJQAKgLARAAQASAAALALQAJAKABATIAAA8g");
	this.shape_310.setTransform(336,186.4);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#F2F2F2").s().p("AgFBFIAAhPIgNAAIAAgTIAjAAIAABigAgDgtQgEgEABgFQgBgGAEgEQADgEAFAAQAHAAADAEQAEAEAAAGQAAAFgEAEQgDAEgHAAQgFAAgDgEg");
	this.shape_311.setTransform(327.25,184.55);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#F2F2F2").s().p("AAVAyIAAg4QAAgNgGgFQgFgHgKAAQgFAAgFADQgGAEgEADIAABHIgWAAIAAhiIAQAAIAEAJQAKgLARAAQASAAAKALQAKAKAAATIAAA8g");
	this.shape_312.setTransform(319.15,186.4);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#F2F2F2").s().p("AghAyIAAhiIAXAAIAAAJQAKgLAPAAQAMABAHADIgKAUQgHgEgHgBQgIABgFAHQgHAIAAAKIAAA3g");
	this.shape_313.setTransform(310.075,186.4);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgFQgEAGgHADQgHADgJAAQgQAAgJgHQgJgJAAgOQAAgRANgKQANgJAXAAIAJABQAAgSgVAAQgNABgJAEIgFgSQAMgFARgBQAVAAALAKQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEAAQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgaAAAAASg");
	this.shape_314.setTransform(300.475,186.5);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgWAPgPQAPgPATAAQAWAAANANQANANAAAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgJIAJASQgNAKgYAAQgWAAgNgNgAAZgJQgCgXgVAAQgUAAgFAXIAwAAIAAAAg");
	this.shape_315.setTransform(289.9,186.5);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#F2F2F2").s().p("AgQAyIAAhzIAWgGIAABvQAAASALAEQgFAKgMAAQgQAAAAgWg");
	this.shape_316.setTransform(282.2,184.45);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#F2F2F2").s().p("AgtBGIAAiJIAXAAIAAAGQAJgIANAAQAuAAAAA0QAAAXgNANQgNAOgWAAQgLAAgJgFIAAAqgAgWgrIAAAzQAGAFAJABQAPgBAHgHQAHgHAAgRQAAgRgHgIQgHgGgPAAQgIgBgHAHg");
	this.shape_317.setTransform(267.775,188.35);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_318.setTransform(256.725,186.5);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#F2F2F2").s().p("AgQAyIAAhzIAWgGIAABvQAAASALAEQgFAKgMAAQgQAAAAgWg");
	this.shape_319.setTransform(249.1,184.45);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#F2F2F2").s().p("AgiAmQgOgOAAgXQAAgWAPgPQAPgPATAAQAVAAANANQANANABAUIgCAMIhGAAQABAMAHAHQAIAGALAAQAQAAAJgJIAJASQgNAKgYAAQgWAAgNgNgAAZgJQgCgXgVAAQgUAAgEAXIAvAAIAAAAg");
	this.shape_320.setTransform(240.3,186.5);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#F2F2F2").s().p("AgDAzIgthlIAZAAIAXA8IAZg8IAZAAIguBlg");
	this.shape_321.setTransform(229.85,186.575);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#F2F2F2").s().p("AgiAmQgNgOAAgXQAAgWAOgPQAOgPAUAAQAVAAANANQAOANAAAUIgDAMIhFAAQAAAMAIAHQAIAGALAAQAQAAAIgJIAJASQgMAKgZAAQgVAAgNgNgAAZgJQgCgXgWAAQgSAAgFAXIAvAAIAAAAg");
	this.shape_322.setTransform(219.4,186.5);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#F2F2F2").s().p("AghA6QgMgNAAgXQAAgXAOgPQAOgOATAAQALAAAKAFIAAgoIAXgGIAACNIgXAAIAAgGQgDADgHADQgHACgGAAQgVAAgMgOgAgNgCQgIAIAAAPQAAAgAdAAIAIgCQAFgDACgCIAAgzQgIgFgIAAQgNgBgHAJg");
	this.shape_323.setTransform(208.325,184.45);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_324.setTransform(191.875,186.5);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgwIgMAAIAAgTIAMAAIAAgVIAWgIIAAAdIAbAAIAAATIgbAAIAAAqQAAAKADAFQAEAEAIABQAIAAAIgGIAAAWQgIADgPAAQgOAAgIgIg");
	this.shape_325.setTransform(182.725,185.15);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#F2F2F2").s().p("AgSAyIgQgHIAIgTQALAJANAAQAMAAAAgKQAAgGgDgDQgFgDgKgGQgagJAAgTQAAgOAKgGQAJgIAPAAQAQABANAGIgGASQgIgGgOgBQgLAAAAAKQAAAEAEAEQAEACAMAGQANAEAGAHQAGAHAAAKQAAAOgKAJQgLAHgQAAQgKAAgGgBg");
	this.shape_326.setTransform(169.25,186.5);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#F2F2F2").s().p("AgQAyIAAhzIAWgGIAABvQAAASALAEQgFAKgMAAQgQAAAAgWg");
	this.shape_327.setTransform(162.9,184.45);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_328.setTransform(154.175,186.5);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_329.setTransform(143.425,186.5);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#F2F2F2").s().p("AgMA5QgIgJAAgQIAAgwIgMAAIAAgTIAMAAIAAgVIAWgIIAAAdIAbAAIAAATIgbAAIAAAqQAAAKADAFQAEAEAIABQAIAAAIgGIAAAWQgIADgPAAQgOAAgIgIg");
	this.shape_330.setTransform(134.275,185.15);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#F2F2F2").s().p("AgiAmQgNgOAAgXQAAgWAOgPQAOgPAUAAQAVAAANANQAOANAAAUIgDAMIhGAAQACAMAHAHQAHAGAMAAQAQAAAIgJIAJASQgMAKgZAAQgVAAgNgNgAAZgJQgCgXgWAAQgSAAgFAXIAvAAIAAAAg");
	this.shape_331.setTransform(119.4,186.5);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#F2F2F2").s().p("AgSAyIgPgHIAIgTQAKAJANAAQANAAAAgKQAAgGgFgDQgEgDgKgGQgagJAAgTQAAgOAKgGQAKgIAOAAQAPABAOAGIgHASQgHgGgNgBQgMAAAAAKQAAAEAEAEQAEACAMAGQAOAEAFAHQAGAHAAAKQAAAOgLAJQgJAHgSAAQgKAAgFgBg");
	this.shape_332.setTransform(109.9,186.5);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAYAAIAAA+QAAATARAAQAHAAAGgEQAIgEABgFIAAhEIAYAAIAABjIgYAAIAAgJQgEAFgJADQgIADgHAAQgiAAgBglg");
	this.shape_333.setTransform(100.2,186.575);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#F2F2F2").s().p("AAUAyIAAg4QAAgNgEgFQgGgHgKAAQgEAAgGADQgGAEgDADIAABHIgYAAIAAhiIARAAIAFAJQAJgLASAAQARAAALALQAKAKAAATIAAA8g");
	this.shape_334.setTransform(83.3,186.4);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#F2F2F2").s().p("AAWAwQgEgEgBgFQgEAGgHADQgHADgJAAQgQAAgJgHQgJgJAAgOQAAgRANgKQANgJAXAAIAJABQAAgSgVAAQgNABgJAEIgFgSQAMgFARgBQAVAAALAKQAKALAAAdIAAAUQAAAUAIAFQgCAFgEABQgEABgEAAQgFAAgEgDgAgVAUQAAANAPAAQAUAAAAgVIAAgJIgJgBQgaAAAAASg");
	this.shape_335.setTransform(72.725,186.5);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#F2F2F2").s().p("AgcAmQgNgNgBgYQAAgXAPgOQAPgPAYAAQARAAANAKIgKASQgIgJgOAAQgMAAgHAJQgIAJAAAPQAAAfAdAAQAMAAAKgJIAIASQgJAHgIABQgIACgKAAQgWAAgNgNg");
	this.shape_336.setTransform(62.75,186.5);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#F2F2F2").s().p("AgrAOIAAhAIAXAAIAAA+QAAATASAAQAHAAAHgEQAGgEADgFIAAhEIAWAAIAABjIgWAAIAAgJQgGAFgIADQgIADgHAAQgjAAAAglg");
	this.shape_337.setTransform(46.6,186.575);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#F2F2F2").s().p("AgiAmQgNgPAAgXQAAgWANgOQAOgOAUgBQAXAAAMAOQANANAAAYQAAAXgNAPQgNANgWAAQgWAAgMgNgAgQgXQgHAJAAAOQAAAgAXAAQALABAGgJQAHgJAAgPQAAgggYAAQgKAAgGAJg");
	this.shape_338.setTransform(35.625,186.5);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#F2F2F2").s().p("AgLBEIAAg4IguhPIAaAAIAfA6IAgg6IAaAAIguBPIAAA4g");
	this.shape_339.setTransform(26.175,184.65);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#F2F2F2").s().p("ABVBdIAAhxQAAgkghAAQgJAAgJAFQgJAGgDAHIAACDIgqAAIAAh4QAAgOgJgHQgIgIgPAAQgIAAgKAFQgJAGgEAIIAACCIgrAAIAAi2IAdAAIAJAQQASgTAcAAQAkAAASAUQAIgJAOgGQAPgFAOAAQAeAAASARQAQASAAAeIAAB4g");
	this.shape_340.setTransform(355.225,154.475);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#F2F2F2").s().p("AhABHQgZgZABgsQAAgrAbgaQAagbAkAAQAoAAAYAYQAZAXAAAmQgBAHgDAPIiCAAQACAWAOAMQANAMAXAAQAdAAAPgPIAQAgQgWATgtAAQgpAAgYgYgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_341.setTransform(330.15,154.65);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#F2F2F2").s().p("AgfBcIAAjVIAqgLIAADNQAAAiAUAHQgKASgXABQgdAAAAgpg");
	this.shape_342.setTransform(316,150.9);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#F2F2F2").s().p("AgyB3IgJAOIgZAAIAAj+IArgLIAABWQARgKAUAAQAogBAYAaQAZAZAAAnQAAAugZAbQgZAagpABQgaAAgSgOgAgpgKIAABfQAKALAQAAQAeAAANgPQAMgOAAghQAAg2g0AAQgTAAgKAKg");
	this.shape_343.setTransform(299.875,150.9);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#F2F2F2").s().p("AhABFQgXgaAAgrQAAgpAZgbQAXgaAnAAQAqAAAXAZQAXAaAAArQAAArgXAaQgYAagpAAQgpAAgXgagAgfgrQgMAQABAbQAAA8AqAAQAUAAAMgPQAMgQgBgdQAAg7grAAQgTAAgMAQg");
	this.shape_344.setTransform(279.55,154.65);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAcAAQAWAAAMAGIgSAlQgMgHgOAAQgOAAgLANQgLAOAAATIAABng");
	this.shape_345.setTransform(263.2,154.475);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#F2F2F2").s().p("AhUCBIAAj+IArAAIAAANQAQgQAXAAQBXAAAABgQAAAsgYAYQgZAZgoAAQgUAAgRgIIAABMgAgphQIAABfQALAKAQAAQAdAAANgOQANgOgBgeQABgggNgOQgNgNgdAAQgPAAgMAMg");
	this.shape_346.setTransform(244.8,158.075);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgpAZgbQAXgaAnAAQAqAAAXAZQAXAaAAArQAAArgXAaQgYAagpAAQgpAAgWgagAgfgrQgMAQABAbQAAA8AqAAQAUAAAMgPQAMgQAAgdQgBg7grAAQgTAAgMAQg");
	this.shape_347.setTransform(213.95,154.65);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#F2F2F2").s().p("ABJB/Ih4idIAACaIgrAAIAAj6IAVAAIB2CWIAAiWIAqAAIAAD9g");
	this.shape_348.setTransform(192.375,151.45);

	this.yes_button2 = new lib.yes_button();
	this.yes_button2.name = "yes_button2";
	this.yes_button2.setTransform(158.55,302.4,1,1,0,0,0,66.5,66.5);
	new cjs.ButtonHelper(this.yes_button2, 0, 1, 2, false, new lib.yes_button(), 3);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#00192C").s().p("AgUBaQgGgGAAgJQAAgJAGgFQAGgHAJABQAIgBAFAHQAHAFAAAJQAAAJgHAGQgFAGgIAAQgJAAgGgGgAgTAlIgCgHQgCgFAAgEQAAgIACgIQADgGAEgGIAQgVQANgOAAgJQAAgSgXAAQgLAAgMALIgOgYQARgNAaAAQAUAAAOALQANAMAAATQABANgFAJQgFAJgNAMQgNALgEAIQgDAIAAAKIACAKg");
	this.shape_349.setTransform(441.25,155.55);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgEg+QgGgFAAgIQAAgIAGgFQAEgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgEgFg");
	this.shape_350.setTransform(415.8,155.475);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#00192C").s().p("Ag6BRIATgZQARAQAUAAQANAAAJgEQAJgEAAgIQAAgMgUAAIgOACIgQABQghAAAAgXQAAgHAGgHQAFgGAHgDQgXgOAAgcQAAgWAQgOQAQgOAXAAQASgBAMAIIAMgPIAWAUIgPALQAIAMAAARQAAAWgOAPQgOANgWgBIgIgBIgGAAIgGACQgGAEAAADQAAAEAJABIANgDQAIgCAHAAQAuAAAAAmQAAAUgTAMQgSAMgZAAQggAAgYgTgAgUg7QgHAIAAAKQAAAMAHAIQAGAHAMAAQAKAAAGgHQAHgHAAgNQAAgKgHgHQgHgHgJAAQgLAAgHAGg");
	this.shape_351.setTransform(398.15,160.25);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgfASgTQARgTAdgBQAfAAARATQARATAAAgQAAAggRAUQgSASgeAAQgeABgRgUgAgXggQgIAMAAAUQAAAsAfAAQAPAAAIgLQAJgMAAgVQAAgrgggBQgOAAgJAMg");
	this.shape_352.setTransform(384.175,158.1);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgfASgTQARgTAdgBQAfAAARATQARATAAAgQAAAggRAUQgSASgeAAQgeABgRgUgAgXggQgIAMAAAUQAAAsAfAAQAPAAAIgLQAJgMAAgVQAAgrgggBQgOAAgJAMg");
	this.shape_353.setTransform(354.025,158.1);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAHQAEAFAMABQALAAAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_354.setTransform(341.425,156.25);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#00192C").s().p("AgvA0QgSgSAAghQAAgfATgTQAUgVAbAAQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRANghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_355.setTransform(306.075,158.1);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#00192C").s().p("AgvA0QgSgSAAghQAAgfATgTQAUgVAbAAQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRANghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_356.setTransform(291.175,158.1);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#00192C").s().p("AgZBFQgJgDgMgHIALgZQAPALARAAQASAAgBgNQAAgHgFgGQgGgEgOgIQgkgNAAgaQABgSANgKQANgJAUgBQAVAAATAKIgJAYQgKgIgTAAQgPAAAAANQAAAFAEAFQAGADARAIQASAGAIAKQAIAKAAAOQAAATgOALQgOALgXgBQgOAAgIgBg");
	this.shape_357.setTransform(255.05,158.1);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAHQAEAFAMABQALAAAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_358.setTransform(244.225,156.25);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#00192C").s().p("AgvA0QgSgSAAghQAAgfATgTQAUgVAbAAQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRANghAAQgeAAgSgSgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_359.setTransform(216.425,158.1);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#00192C").s().p("AguBQQgQgSAAggQAAgfATgUQASgVAcAAQAPAAANAHIAAg3IAggHIAADBIggAAIAAgJQgEAFgJADQgKADgJAAQgcAAgRgSgAgTgDQgKAKAAAWQAAArAoAAQAEAAAHgDQAHgDACgDIAAhGQgKgIgLAAQgSAAgLAMg");
	this.shape_360.setTransform(201.275,155.325);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAHQAEAFAMABQALAAAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_361.setTransform(173.325,156.25);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#00192C").s().p("AgZBFQgJgDgMgHIALgZQAPALARAAQASAAAAgNQgBgHgFgGQgGgEgOgIQgkgNAAgaQAAgSANgKQAOgJAUgBQAVAAATAKIgJAYQgLgIgSAAQgPAAAAANQAAAFAEAFQAGADARAIQASAGAIAKQAIAKAAAOQAAATgOALQgPALgWgBQgOAAgIgBg");
	this.shape_362.setTransform(162.7,158.1);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#00192C").s().p("AgHAIQgDgDAAgFQgBgEAEgDQADgDAEAAQAEAAAEADQADADAAAEQAAAFgDADQgEADgEAAQgEAAgDgDg");
	this.shape_363.setTransform(392.1,304.475);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_364.setTransform(378.625,301.9);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_365.setTransform(365.625,301.9);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgEgCQgCgDgIgDQgRgHAAgNQAAgJAHgEQAHgGAJABQAKgBAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADADACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_366.setTransform(347.8,301.9);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_367.setTransform(333.675,301.9);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#00192C").s().p("AgTAaQgJgJAAgRQAAgOAKgLQAKgKAQABQAMgBAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAJQAAAWAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHABQgPAAgJgKg");
	this.shape_368.setTransform(326.675,301.9);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_369.setTransform(311.975,301.9);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_370.setTransform(304.625,301.9);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#00192C").s().p("AgIAmQgFgFAAgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAGAAAFgDIAAAPQgGACgLAAQgJAAgFgHg");
	this.shape_371.setTransform(298.35,301);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#00192C").s().p("AATAjIgTgpIgRApIgHAAIgZhFIAQAAIAOAoIARgoIAFAAIARAoIAPgoIAPAAIgaBFg");
	this.shape_372.setTransform(286.85,301.975);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_373.setTransform(278.025,301.9);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgEACgHABQgKgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgKAAgFADIgEgNQAJgEALABQAOAAAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_374.setTransform(259.35,301.9);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_375.setTransform(248.225,301.9);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgEACgHABQgKgBgGgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgKAAgGADIgDgNQAJgEALABQAOAAAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_376.setTransform(234.25,301.9);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGAAQgDABgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAHgGAJAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_377.setTransform(226.9,300.45);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_378.setTransform(215.475,301.9);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#00192C").s().p("AgIAmQgGgFAAgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHACADQADADAFAAQAHAAAEgDIAAAPQgFACgKAAQgJAAgGgHg");
	this.shape_379.setTransform(209.2,301);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAGAAAFgDIAAAPQgGACgLAAQgJAAgFgHg");
	this.shape_380.setTransform(200.15,301);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgCQgDgDgHgDQgSgHAAgNQAAgJAHgEQAHgGAJABQALgBAJAGIgFAMQgFgFgJAAQgIAAABAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_381.setTransform(194.85,301.9);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_382.setTransform(188.325,301.9);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_383.setTransform(180.775,301.975);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#00192C").s().p("AAQAwIAAgcQgGADgKAAQgOAAgIgJQgJgKAAgPQAAgQAKgKQAKgKANAAQAJAAAIAFIACgDIAKAAIAABdgAgJgbQgFAGAAAKQAAAVASAAQAHgBAFgDIAAgkQgFgEgHAAQgHABgGAGg");
	this.shape_384.setTransform(173.1,303.15);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANABQAOgBAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_385.setTransform(165.675,301.9);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQABAIAJQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_386.setTransform(520.625,284.8);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#00192C").s().p("AgIAmQgFgFAAgLIAAghIgJAAIAAgNIAJAAIAAgOIAPgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAGAAAEgDIAAAPQgFACgLAAQgJAAgFgHg");
	this.shape_387.setTransform(514.35,283.9);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_388.setTransform(504.175,284.8);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgHAOQgEgDgFAAQgGAAgDAFQgEAFAAAHIAAAmg");
	this.shape_389.setTransform(498.05,284.725);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_390.setTransform(491.175,284.8);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGABQgDAAgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAGgGAKAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_391.setTransform(483.6,283.35);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#00192C").s().p("AAMAwIgTgeIgHAIIAAAWIgQAAIAAhcIAQgEIAAA3IAVgZIATAAIgXAZIAcApg");
	this.shape_392.setTransform(472.725,283.35);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#00192C").s().p("AgTAaQgJgJAAgQQAAgPAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAKQAAAVAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHABQgPAAgJgKg");
	this.shape_393.setTransform(465.425,284.8);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#00192C").s().p("AgLAiIAAhPIAPgDIAABLQAAANAIACQgEAHgIAAQgLAAAAgPg");
	this.shape_394.setTransform(456.75,283.425);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#00192C").s().p("AgTAaQgJgJAAgQQAAgPAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAKQAAAVAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHABQgPAAgJgKg");
	this.shape_395.setTransform(451.125,284.8);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_396.setTransform(440.175,284.8);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgJAHgEQAGgGAKAAQAKAAAKAGIgFAMQgFgFgJAAQgIAAABAHQAAADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_397.setTransform(433.7,284.8);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgJAAgHADIgDgNQAIgEALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_398.setTransform(427.5,284.8);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_399.setTransform(420.275,284.8);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#00192C").s().p("AgHAIQgEgDABgFQgBgEAEgDQADgDAEAAQAEAAAEADQAEADgBAEQABAFgEADQgEADgEAAQgEAAgDgDg");
	this.shape_400.setTransform(398.75,287.375);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQABAIAJQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_401.setTransform(392.825,284.8);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQABAIAJQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_402.setTransform(377.825,284.8);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#00192C").s().p("AgOAwIAAg2IgKAAIAAgNIAKAAQABgMAHgIQAGgIALAAQAFAAAJACIgFANIgIgCQgEAAgEAEQgDAEAAAGIAAABIAPAAIAAANIgPAAIAAA2g");
	this.shape_403.setTransform(372,283.4);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#00192C").s().p("AgIAmQgFgFAAgLIAAghIgJAAIAAgNIAJAAIAAgOIAPgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAGAAAFgDIAAAPQgGACgLAAQgJAAgFgHg");
	this.shape_404.setTransform(366.75,283.9);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgHAOQgEgDgFAAQgGAAgDAFQgEAFAAAHIAAAmg");
	this.shape_405.setTransform(361.8,284.725);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQABAIAJQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_406.setTransform(354.975,284.8);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#00192C").s().p("AgeAwIAAhdIAPAAIAAAEQAGgGAJAAQAfAAABAkQgBAPgIAKQgKAJgOAAQgIAAgGgDIAAAcgAgPgdIAAAjQAEADAHABQAJgBAFgFQAFgEAAgMQAAgLgFgFQgFgGgJABQgHAAgEAEg");
	this.shape_407.setTransform(347.65,286.05);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAFAAQAGAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_408.setTransform(319.25,283.9);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgEgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgEAMQgGgFgJAAQgHAAgBAHQAAADADACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_409.setTransform(313.95,284.8);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#00192C").s().p("AAQAiIgQgWIgQAWIgSAAIAZgiIgXghIASAAIAOAVIAPgVIASAAIgaAhIAcAig");
	this.shape_410.setTransform(303.75,284.8);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_411.setTransform(296.425,284.8);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_412.setTransform(285.075,284.8);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGABQgDAAgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAGgGAKAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_413.setTransform(277.5,283.35);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAOgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHADADQACADAFAAQAGAAAGgDIAAAPQgGACgKAAQgKAAgFgHg");
	this.shape_414.setTransform(271.05,283.9);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGABQgDAAgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAGgGAKAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_415.setTransform(249.25,283.35);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAOgGIAAAUIATAAIAAANIgTAAIAAAdQABAHACADQACADAGAAQAFAAAGgDIAAAPQgGACgLAAQgJAAgFgHg");
	this.shape_416.setTransform(242.8,283.9);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#00192C").s().p("AASAjIgSgpIgRApIgHAAIgZhFIAQAAIAOAoIARgoIAEAAIARAoIAQgoIAPAAIgZBFg");
	this.shape_417.setTransform(231.35,284.875);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgFAMQgFgFgJAAQgIAAABAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_418.setTransform(219.6,284.8);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_419.setTransform(213.075,284.8);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAdQABAHABADQADADAFAAQAHAAAEgDIAAAPQgFACgKAAQgJAAgGgHg");
	this.shape_420.setTransform(196.05,283.9);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_421.setTransform(190.1,284.8);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIAKAAQAJAAAEADIgHAOQgEgDgFAAQgGAAgCAFQgFAFAAAHIAAAmg");
	this.shape_422.setTransform(176.55,284.725);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_423.setTransform(169.675,284.8);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#00192C").s().p("AgIAmQgFgFAAgLIAAghIgJAAIAAgNIAJAAIAAgOIAPgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAGAAAEgDIAAAPQgFACgLAAQgJAAgFgHg");
	this.shape_424.setTransform(163.35,283.9);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#00192C").s().p("AgLAiIAAhPIAPgDIAABLQAAANAIACQgEAHgIAAQgLAAAAgPg");
	this.shape_425.setTransform(159.3,283.425);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgEACgHABQgKgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgKAAgFADIgEgNQAJgEALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_426.setTransform(153.6,284.8);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#00192C").s().p("AgZAhQASAAAAgJQAAgGgFgMIgVg0IARAAIARAuIARguIAQAAIgeBOQgDAGgGAFQgJAEgLAAg");
	this.shape_427.setTransform(142.75,286.125);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgJAAgHADIgDgNQAIgEAMAAQAOABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_428.setTransform(128.25,284.8);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgHAOQgEgDgFAAQgGAAgDAFQgEAFAAAHIAAAmg");
	this.shape_429.setTransform(118.45,284.725);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_430.setTransform(111.575,284.8);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABABgHQAAgEgDgDQgDgCgIgDQgRgHAAgNQAAgJAHgEQAGgGAKAAQAKAAAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_431.setTransform(93.75,284.8);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQABAIAJQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_432.setTransform(79.625,284.8);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#00192C").s().p("AgTAaQgJgJAAgQQAAgPAKgLQAKgKAQAAQAMAAAJAIIgHALQgGgFgJAAQgIAAgFAGQgGAGAAAKQAAAVAUAAQAJAAAGgGIAGAMQgHAFgFABQgFABgHABQgPAAgJgKg");
	this.shape_433.setTransform(72.625,284.8);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_434.setTransform(61.675,284.8);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgEgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAHgGAJAAQAKAAAKAGIgEAMQgGgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_435.setTransform(55.2,284.8);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#00192C").s().p("AAPAhQgDgDgBgDQgCAEgFACQgFACgGABQgKgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgIAAgGADIgEgNQAJgEAKAAQAPABAHAHQAIAHAAAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_436.setTransform(49,284.8);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#00192C").s().p("AgXAaQgJgJAAgQQAAgPAKgLQAKgKANAAQAOAAAJAJQAJAKAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_437.setTransform(41.775,284.8);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#00192C").s().p("AgLAiIAAhPIAPgDIAABLQAAANAIACQgEAHgIAAQgLAAAAgPg");
	this.shape_438.setTransform(36.55,283.425);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#00192C").s().p("AgeAvIAAhcIAUgBQAVAAAKAHQAKAHAAAOQAAAfglAAIgHAAIAAAigAgNgfIAAAeIAGAAQALAAAFgDQAFgEAAgJQAAgOgWAAg");
	this.shape_439.setTransform(30.675,283.525);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#F2F2F2").s().p("AgUAWQgKgJAAgNQAAgMAKgJQAIgJAMAAQANAAAJAJQAJAJAAAMQAAANgJAJQgJAJgNAAQgMAAgIgJg");
	this.shape_440.setTransform(524.65,246.875);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#F2F2F2").s().p("Ag+BsQgVgYAAgsQgBgqAagbQAZgbAlAAQAVgBARAJIAAhJIArgLIAAEFIgrAAIAAgLQgFAFgNAFQgNAFgMAAQgmAAgXgZgAgZgFQgOAPAAAdQAAA6A2AAQAGAAAJgEQAJgEADgEIAAheQgOgLgOAAQgZAAgOAPg");
	this.shape_441.setTransform(508.2,236.2);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#F2F2F2").s().p("AhABGQgYgYAAgsQAAgqAbgbQAagbAlAAQAoAAAYAYQAYAYgBAkQAAAIgDAPIiCAAQABAWAOAMQAOAMAWAAQAdAAAQgPIAQAgQgWATgtAAQgoAAgZgZgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_442.setTransform(488.25,239.95);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgKIAPghQATAPAYAAQAYAAAAgSQAAgLgIgGQgHgHgVgIQgvgUAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAKQAYAJALAMQAKAOAAATQAAAZgSAQQgTAOggAAQgSAAgLgDg");
	this.shape_443.setTransform(470.675,239.95);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#F2F2F2").s().p("AhPAZIAAh1IArAAIAAByQAAAjAfAAQAOAAAMgHQANgIAEgKIAAh8IAqAAIAAC2IgqAAIAAgPQgJAHgQAGQgPAFgNAAQhAAAAAhEg");
	this.shape_444.setTransform(452.825,240.125);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#F2F2F2").s().p("AhABGQgZgYABgsQAAgqAbgbQAagbAlAAQAnAAAYAYQAZAYAAAkQgBAIgDAPIiCAAQABAWAPAMQANAMAXAAQAdAAAPgPIAQAgQgWATgtAAQgpAAgYgZgAAvgSQgFgogoAAQgkAAgIAoIBZAAIAAAAg");
	this.shape_445.setTransform(421.95,239.95);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#F2F2F2").s().p("AgyB3IgJAOIgZAAIAAj+IArgLIAABWQARgLAUABQAoAAAYAZQAZAaAAAmQAAAugZAbQgZAbgpAAQgaAAgSgOgAgpgJIAABeQAKALAQAAQAeAAANgPQAMgOAAggQAAg3g0AAQgTAAgKALg");
	this.shape_446.setTransform(401.975,236.2);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_447.setTransform(370.725,239.775);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#F2F2F2").s().p("AApBYQgIgHgCgIQgHAKgOAGQgOAGgPAAQgeAAgQgPQgRgPgBgbQABgfAYgSQAXgSArAAQAHAAALADQAAgggoAAQgYAAgQAIIgKgiQAXgKAeAAQApAAAUATQATATAAA1IAAAnQAAAkAPAKQgGAIgGADQgHACgIAAQgKAAgGgHgAgnAlQgBAYAdAAQAlAAAAgnIAAgRIgQgCQgyAAABAig");
	this.shape_448.setTransform(351.25,239.95);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#F2F2F2").s().p("Ag1BGQgYgYgBgsQAAgqAbgcQAcgaAsAAQAhAAAXASIgSAgQgPgOgZAAQgYAAgOAQQgOAQAAAcQAAA5A2AAQAXAAATgQIAQAiQgTAMgOADQgOADgTAAQgpAAgZgZg");
	this.shape_449.setTransform(332.85,239.95);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAPAAQAQAAANgJIAAAoQgPAFgbAAQgbAAgOgQg");
	this.shape_450.setTransform(306.4,237.475);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhTQgHgIAAgKQAAgKAHgHQAGgIAKAAQALAAAHAIQAHAHAAAKQAAAKgHAIQgHAGgLABQgKgBgGgGg");
	this.shape_451.setTransform(293.775,236.4);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#F2F2F2").s().p("AhABGQgZgYAAgsQAAgqAcgbQAagbAkAAQAoAAAYAYQAZAYAAAkQgBAIgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgpAAgYgZgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_452.setTransform(268.6,239.95);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAdAAQAVAAAMAGIgSAlQgLgHgOAAQgPAAgKANQgMAOAAATIAABng");
	this.shape_453.setTransform(252.1,239.775);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgqAYgaQAZgaAmAAQAqAAAXAaQAXAYAAAsQAAAsgYAZQgXAagpAAQgoAAgXgagAgegrQgNAPAAAcQAAA8ArAAQAUAAAMgPQALgRABgcQgBg7grAAQgTAAgLAQg");
	this.shape_454.setTransform(233.7,239.95);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#F2F2F2").s().p("AgmCBIAAiTIgbAAIAAgjIAbAAQABgiATgUQASgVAdAAQAPAAAWAGIgNAhQgOgFgHAAQgMAAgJALQgIAKAAAPIAAAFIAmAAIAAAjIglAAIAACTg");
	this.shape_455.setTransform(218.075,236.2);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#F2F2F2").s().p("AhABGQgYgYgBgsQAAgqAbgbQAbgbAkAAQApAAAXAYQAYAYAAAkQAAAIgDAPIiCAAQACAWAOAMQANAMAWAAQAdAAAQgPIARAgQgXATgtAAQgoAAgZgZgAAugSQgEgogoAAQgjAAgJAoIBYAAIAAAAg");
	this.shape_456.setTransform(200.85,239.95);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#F2F2F2").s().p("AgyB3IgJAOIgZAAIAAj+IArgLIAABWQARgLAUABQAoAAAYAZQAZAaAAAmQAAAugZAbQgZAbgpAAQgaAAgSgOgAgpgJIAABeQAKALAQAAQAeAAANgPQAMgOAAggQAAg3g0AAQgTAAgKALg");
	this.shape_457.setTransform(180.875,236.2);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAcAAQAXAAALAGIgSAlQgLgHgPAAQgOAAgLANQgLAOAAATIAABng");
	this.shape_458.setTransform(153.5,239.775);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#F2F2F2").s().p("AhABGQgZgYABgsQAAgqAagbQAbgbAkAAQAoAAAYAYQAZAYAAAkQgBAIgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgpAAgYgZgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_459.setTransform(134.95,239.95);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#F2F2F2").s().p("Ag9BsQgXgYAAgsQAAgqAagbQAZgbAlAAQAVgBARAJIAAhJIAqgLIAAEFIgqAAIAAgLQgGAFgMAFQgNAFgNAAQglAAgWgZgAgZgFQgOAPAAAdQAAA6A2AAQAGAAAJgEQAJgEADgEIAAheQgOgLgPAAQgZAAgNAPg");
	this.shape_460.setTransform(114.5,236.2);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhTQgHgIAAgKQAAgKAHgHQAGgIAKAAQALAAAHAIQAHAHAAAKQAAAKgHAIQgHAGgLABQgKgBgGgGg");
	this.shape_461.setTransform(98.825,236.4);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#F2F2F2").s().p("AgIBdIhSi5IAuAAIAsBuIAuhuIAtAAIhUC5g");
	this.shape_462.setTransform(83.875,240.125);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgqAZgaQAYgaAmAAQAqAAAXAaQAXAYAAAsQAAAsgYAZQgXAagpAAQgpAAgWgagAgfgrQgLAPgBAcQAAA8ArAAQAUAAAMgPQAMgRAAgcQAAg7gsAAQgTAAgMAQg");
	this.shape_463.setTransform(64.75,239.95);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQARgUAdAAQAXAAALAGIgSAlQgMgHgOAAQgOAAgLANQgLAOAAATIAABng");
	this.shape_464.setTransform(48.4,239.775);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#F2F2F2").s().p("AhUCBIAAj+IArAAIAAANQAQgQAYAAQBWAAAABgQAAAsgYAYQgZAZgpAAQgTAAgRgIIAABMgAgphQIAABfQAMAKAPAAQAdAAANgOQAMgOAAgeQAAgggMgOQgNgNgdAAQgPAAgMAMg");
	this.shape_465.setTransform(30,243.375);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgJIAPgiQATAPAYAAQAYAAAAgSQAAgKgIgHQgHgGgVgJQgvgUAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAJQAYAKALANQAKANAAATQAAAagSAPQgTAOggAAQgSAAgLgDg");
	this.shape_466.setTransform(523.675,197.3);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhTQgHgIAAgKQAAgKAHgHQAGgIAKAAQALAAAHAIQAHAHAAAKQAAAKgHAIQgHAGgLABQgKgBgGgGg");
	this.shape_467.setTransform(510.375,193.75);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#F2F2F2").s().p("AAmCDIAAhxQAAgRgLgJQgKgKgRAAQgKAAgLAFQgLAGgEAHIAACDIgsAAIAAj6IAsgLIAABaQAQgPAcAAQAjAAATATQATATAAAjIAABxg");
	this.shape_468.setTransform(495.425,193.375);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAQAAQAPAAANgJIAAAoQgOAFgcAAQgaAAgPgQg");
	this.shape_469.setTransform(478.05,194.825);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#F2F2F2").s().p("AAmCDIAAhxQAAgRgLgJQgKgKgRAAQgKAAgLAFQgLAGgEAHIAACDIgsAAIAAj6IAsgLIAABaQAQgPAcAAQAjAAATATQATATAAAjIAABxg");
	this.shape_470.setTransform(450.375,193.375);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAPAAQAQAAANgJIAAAoQgOAFgcAAQgaAAgPgQg");
	this.shape_471.setTransform(433,194.825);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhTQgHgIAAgKQAAgKAHgHQAGgIAKAAQALAAAHAIQAHAHAAAKQAAAKgHAIQgHAGgLABQgKgBgGgGg");
	this.shape_472.setTransform(420.375,193.75);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#F2F2F2").s().p("AAyBdIgyhvIgxBvIgQAAIhFi5IAtAAIAlBsIAthsIAOAAIAvBtIAnhtIAqAAIhFC5g");
	this.shape_473.setTransform(402.05,197.475);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAQAAQAPAAANgJIAAAoQgOAFgcAAQgaAAgPgQg");
	this.shape_474.setTransform(370.85,194.825);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_475.setTransform(353.675,197.125);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#F2F2F2").s().p("AhABHQgZgZABgsQAAgqAbgbQAagbAkAAQAoAAAYAYQAZAYAAAlQgBAHgDAPIiCAAQABAWAPAMQANAMAXAAQAdAAAPgPIAQAgQgWATgtAAQgpAAgYgYgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_476.setTransform(333.3,197.3);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#F2F2F2").s().p("AhABHQgYgZAAgsQAAgqAbgbQAagbAlAAQAoAAAYAYQAYAYAAAlQAAAHgEAPIiCAAQABAWAOAMQAOAMAWAAQAeAAAPgPIAQAgQgWATgtAAQgoAAgZgYgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_477.setTransform(283.15,197.3);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#F2F2F2").s().p("AhABHQgZgZAAgsQAAgqAbgbQAbgbAkAAQAoAAAZAYQAXAYAAAlQABAHgEAPIiCAAQACAWAOAMQANAMAWAAQAdAAAQgPIARAgQgXATgtAAQgpAAgYgYgAAugSQgEgogoAAQgjAAgJAoIBYAAIAAAAg");
	this.shape_478.setTransform(263.05,197.3);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#F2F2F2").s().p("AhPBtIAbghQAWAUAcABQASAAALgGQAMgFAAgKQAAgQgbAAIgUACIgVACQgsAAAAghQAAgIAHgJQAIgJAJgEQgfgTAAglQAAgeAVgTQAWgUAfAAQAYAAARAKIARgTIAdAaIgUAPQAKAQABAWQgBAggSASQgUASgdAAIgLgBIgHgBIgJAEQgIAEAAADQAAAHAMAAIASgDQALgCAJAAQA+AAAAAyQAAAcgZAPQgZAQgiABQgqAAgigagAgbhPQgJAJAAAPQgBAQAKAKQAIAKAQAAQAOAAAIgKQAIgKAAgQQABgOgJgKQgJgKgNABQgPAAgJAJg");
	this.shape_479.setTransform(229.45,200.2);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#F2F2F2").s().p("AAoBYQgHgHgDgIQgFAKgPAGQgOAGgPAAQgdAAgSgPQgQgPAAgbQgBgfAYgSQAZgSAqAAQAHAAALADQAAgggoAAQgYAAgQAIIgJgiQAVgKAfAAQApAAATATQAUATAAA1IAAAnQAAAkAOAKQgEAIgHADQgHACgIAAQgJAAgIgHgAgoAlQAAAYAdAAQAmAAAAgnIAAgRIgRgCQgxAAgBAig");
	this.shape_480.setTransform(211.35,197.3);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_481.setTransform(181.075,197.125);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgpAZgbQAXgaAnAAQAqAAAXAZQAXAZAAAsQAAArgXAaQgYAagpAAQgpAAgWgagAgfgrQgMAQABAbQAAA8AqAAQAUAAAMgPQAMgRAAgcQgBg7grAAQgTAAgMAQg");
	this.shape_482.setTransform(160.85,197.3);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhTQgHgIAAgKQAAgKAHgHQAGgIAKAAQALAAAHAIQAHAHAAAKQAAAKgHAIQgHAGgLABQgKgBgGgGg");
	this.shape_483.setTransform(145.175,193.75);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAQAAQAPAAANgJIAAAoQgPAFgbAAQgbAAgOgQg");
	this.shape_484.setTransform(133.55,194.825);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#F2F2F2").s().p("Ag1BHQgYgagBgrQAAgqAbgcQAcgaAsAAQAhAAAXASIgSAgQgPgOgZAAQgYAAgOAQQgOAQAAAcQAAA5A2AAQAXAAATgPIAQAhQgTAMgOADQgOADgTAAQgpAAgZgYg");
	this.shape_485.setTransform(117.75,197.3);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#F2F2F2").s().p("AhABHQgZgZABgsQAAgqAbgbQAagbAlAAQAnAAAYAYQAZAYAAAlQAAAHgEAPIiCAAQABAWAOAMQAOAMAXAAQAdAAAPgPIAQAgQgWATgtAAQgoAAgZgYgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_486.setTransform(98.75,197.3);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAQAAQAPAAANgJIAAAoQgPAFgbAAQgaAAgPgQg");
	this.shape_487.setTransform(81.7,194.825);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#F2F2F2").s().p("AhABFQgXgaAAgrQAAgpAYgbQAZgaAmAAQAqAAAXAZQAXAZAAAsQAAArgYAaQgXAagpAAQgoAAgYgagAgegrQgNAQAAAbQAAA8ArAAQAUAAAMgPQALgRAAgcQAAg7grAAQgTAAgLAQg");
	this.shape_488.setTransform(64.95,197.3);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQARgUAeAAQAVAAAMAGIgSAlQgLgHgOAAQgPAAgKANQgMAOAAATIAABng");
	this.shape_489.setTransform(48.6,197.125);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#F2F2F2").s().p("AhUCBIAAj+IArAAIAAANQAQgQAYAAQBWAAAABgQAAAsgYAYQgYAZgqAAQgTAAgRgIIAABMgAgphQIAABfQAMAKAPAAQAcAAANgOQAOgOAAgeQAAgggOgOQgMgNgdAAQgPAAgMAMg");
	this.shape_490.setTransform(30.2,200.725);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#F2F2F2").s().p("AApBYQgIgHgCgIQgHAKgOAGQgNAGgQAAQgeAAgQgPQgRgOAAgcQAAggAYgQQAXgTArABQAHAAALACQAAgggoAAQgYAAgQAIIgJgiQAWgKAeAAQApAAAUATQATATAAA1IAAAnQAAAkAOAKQgFAIgGADQgGACgJAAQgKAAgGgHgAgnAlQAAAYAcAAQAlAAAAgnIAAgRIgQgCQgxAAAAAig");
	this.shape_491.setTransform(437.55,154.65);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAQAAQAPAAANgJIAAAoQgPAFgbAAQgbAAgOgQg");
	this.shape_492.setTransform(421.1,152.175);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#F2F2F2").s().p("AAoBYQgHgHgDgIQgFAKgOAGQgOAGgQAAQgeAAgRgPQgRgOAAgcQAAggAYgQQAZgTAqABQAIAAAKACQAAgggoAAQgYAAgQAIIgKgiQAXgKAeAAQApAAATATQAUATAAA1IAAAnQAAAkAPAKQgFAIgHADQgGACgJAAQgJAAgIgHgAgoAlQABAYAcAAQAmAAAAgnIAAgRIgRgCQgyAAAAAig");
	this.shape_493.setTransform(405.1,154.65);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#F2F2F2").s().p("Ag+BsQgWgYABgrQAAgrAZgbQAZgcAlABQAVAAARAIIAAhJIAqgLIAAEFIgqAAIAAgLQgFAGgNAEQgNAEgMABQgmgBgXgYgAgZgEQgOAOAAAeQAAA5A2AAQAGgBAJgDQAJgEADgDIAAhgQgOgKgOAAQgZAAgOAQg");
	this.shape_494.setTransform(385.25,150.9);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#F2F2F2").s().p("AAoBYQgHgHgDgIQgFAKgOAGQgOAGgQAAQgdAAgSgPQgRgOAAgcQAAggAYgQQAZgTAqABQAIAAAKACQAAgggoAAQgYAAgQAIIgJgiQAVgKAfAAQApAAATATQAUATAAA1IAAAnQAAAkAOAKQgEAIgHADQgHACgIAAQgJAAgIgHgAgoAlQABAYAcAAQAmAAAAgnIAAgRIgRgCQgxAAgBAig");
	this.shape_495.setTransform(355.7,154.65);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#F2F2F2").s().p("AhABHQgZgZAAgsQAAgrAbgaQAbgbAlAAQAoAAAYAYQAXAXAAAmQABAHgEAPIiCAAQABAWAOAMQAOAMAWAAQAeAAAPgPIAQAgQgWATgtAAQgpAAgYgYgAAvgSQgFgogoAAQgkAAgIAoIBZAAIAAAAg");
	this.shape_496.setTransform(325.7,154.65);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAcAAQAXAAALAGIgSAlQgLgHgPAAQgOAAgLANQgLAOAAATIAABng");
	this.shape_497.setTransform(309.2,154.475);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhUQgHgHAAgKQAAgKAHgIQAGgHAKAAQALAAAHAHQAHAIAAAKQAAAKgHAHQgHAIgLAAQgKAAgGgIg");
	this.shape_498.setTransform(294.925,151.1);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#F2F2F2").s().p("AhPAZIAAh1IArAAIAAByQAAAjAfAAQAOAAAMgHQANgIAEgKIAAh8IAqAAIAAC2IgqAAIAAgPQgJAHgQAGQgPAFgNAAQhAAAAAhEg");
	this.shape_499.setTransform(279.975,154.825);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#F2F2F2").s().p("AAqCBIAAhNQgPAJgbAAQgnAAgWgZQgXgYAAgrQAAgtAagaQAagaAnAAQAYAAATAOIAIgLIAbAAIAAD+gAgZhLQgOAQgBAcQAAA4AzAAQATAAAMgJIAAhhQgLgLgSAAQgYAAgOARg");
	this.shape_500.setTransform(259.2,158.075);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#F2F2F2").s().p("AhABHQgZgZAAgsQAAgrAbgaQAbgbAkAAQAoAAAZAYQAXAXAAAmQABAHgEAPIiCAAQACAWAOAMQANAMAWAAQAdAAAQgPIARAgQgXATgtAAQgpAAgYgYgAAugSQgEgogoAAQgjAAgJAoIBYAAIAAAAg");
	this.shape_501.setTransform(239.2,154.65);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAcAAQAWAAAMAGIgSAlQgMgHgNAAQgPAAgLANQgLAOAAATIAABng");
	this.shape_502.setTransform(222.7,154.475);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#F2F2F2").s().p("AgeBcIAAjVIApgLIAADNQAAAiAVAHQgKASgYABQgcAAAAgpg");
	this.shape_503.setTransform(199.6,150.9);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#F2F2F2").s().p("AgfBcIAAjVIAqgLIAADNQAAAiAUAHQgJASgXABQgeAAAAgpg");
	this.shape_504.setTransform(189.3,150.9);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#F2F2F2").s().p("AgLB/IAAiTIgXAAIAAgjIBCAAIAAC2gAgGhUQgHgHAAgKQAAgKAHgIQAGgHAKAAQALAAAHAHQAHAIAAAKQAAAKgHAHQgHAIgLAAQgKAAgGgIg");
	this.shape_505.setTransform(177.325,151.1);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#F2F2F2").s().p("AAzBdIgzhvIgxBvIgPAAIhGi5IAtAAIAlBsIAshsIAPAAIAuBtIAohtIAqAAIhFC5g");
	this.shape_506.setTransform(159,154.825);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#F2F2F2").s().p("AgVB9IAAj5IArAAIAAD5g");
	this.shape_507.setTransform(129.975,151.275);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#F2F2F2").s().p("AhUB+IAAj5IBHgCQAmAAAXAQQAWARgBAfQABAeggARQAvAPAAAzQAAAigaAUQgaAUgoAAgAgnAGIAABTIAWABQAcAAAOgKQAOgKAAgXQAAgWgNgJQgNgKgdAAgAgnhXIAAA8IAWAAQAqAAAAggQAAgdgnAAg");
	this.shape_508.setTransform(115.3,151.175);

	this.no_button3 = new lib.no_button();
	this.no_button3.name = "no_button3";
	this.no_button3.setTransform(389.05,302.5,1,1,0,0,0,66.5,66.5);
	new cjs.ButtonHelper(this.no_button3, 0, 1, 2, false, new lib.no_button(), 3);

	this.yes_button3 = new lib.yes_button();
	this.yes_button3.name = "yes_button3";
	this.yes_button3.setTransform(158.55,302.5,1,1,0,0,0,66.5,66.5);
	new cjs.ButtonHelper(this.yes_button3, 0, 1, 2, false, new lib.yes_button(), 3);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#00192C").s().p("AgUBaQgGgGAAgJQAAgIAGgHQAGgFAJAAQAHAAAHAFQAFAHAAAIQAAAJgFAGQgHAGgHAAQgJAAgGgGgAgSAlIgDgGQgCgGAAgEQAAgIACgIQADgGAEgGIAQgVQAMgOAAgJQAAgSgVAAQgMAAgNALIgMgYQAQgNAaAAQAUAAAOALQAOAMAAATQgBANgEAJQgGAJgMAMQgMALgFAIQgDAIAAAKIABAKg");
	this.shape_509.setTransform(506.9,187.75);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#00192C").s().p("AgXBEIAAieIAggHIAACXQgBAaAPAEQgHAOgRAAQgVAAgBgeg");
	this.shape_510.setTransform(498,187.525);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgeASgUQARgUAdAAQAfABARASQARATAAAgQAAAggRAUQgSASgeABQgeAAgRgUgAgXggQgIAMAAAUQAAAsAfABQAPAAAIgMQAJgLAAgWQAAgrgggBQgOAAgJAMg");
	this.shape_511.setTransform(486.075,190.3);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgeASgUQARgUAdAAQAfABARASQARATAAAgQAAAggRAUQgSASgeABQgeAAgRgUgAgXggQgIAMAAAUQAAAsAfABQAPAAAIgMQAJgLAAgWQAAgrgggBQgOAAgJAMg");
	this.shape_512.setTransform(471.375,190.3);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_513.setTransform(458.775,188.45);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_514.setTransform(438.475,190.3);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#00192C").s().p("AAcBhIAAhUQAAgMgIgHQgHgHgNgBQgHAAgIAFQgIAEgDAFIAABhIghAAIAAi5IAhgIIAABCQAMgKAVgBQAZABAOAOQAOAOAAAZIAABUg");
	this.shape_515.setTransform(423.3,187.4);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_516.setTransform(410.375,188.45);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#00192C").s().p("AAcBhIAAhUQAAgMgIgHQgHgHgNgBQgHAAgIAFQgIAEgEAFIAABhIggAAIAAi5IAggIIAABCQANgKAUgBQAaABAOAOQAOAOAAAZIAABUg");
	this.shape_517.setTransform(366.75,187.4);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_518.setTransform(353.825,188.45);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgFg+QgFgFAAgIQAAgIAFgFQAFgFAIAAQAHAAAFAFQAGAFAAAIQAAAIgGAFQgFAFgHAAQgIAAgFgFg");
	this.shape_519.setTransform(344.45,187.675);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#00192C").s().p("AAlBFIglhSIgkBSIgMAAIgziJIAhAAIAcBQIAhhQIAKAAIAjBQIAdhQIAfAAIgzCJg");
	this.shape_520.setTransform(330.825,190.425);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#00192C").s().p("AgeBmQAagcAAhOQAAhCgagjIAAgSQAaANARAjQASAkAAAjQAAAogQAiQgPAhgeAVg");
	this.shape_521.setTransform(308.5,190.525);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_522.setTransform(295.925,190.3);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_523.setTransform(283.225,188.45);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_524.setTransform(270.725,190.3);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#00192C").s().p("AgWBEIAAieIAfgHIAACXQAAAaAOAEQgHAOgRAAQgWAAABgeg");
	this.shape_525.setTransform(260.2,187.525);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_526.setTransform(248.175,190.3);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAVAAQARAAAIAFIgOAbQgIgGgKAAQgLAAgIAKQgIAKAAAPIAABMg");
	this.shape_527.setTransform(213.05,190.175);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#00192C").s().p("AgvAzQgRgTAAggQAAgeASgUQARgUAdAAQAfABARASQARATAAAgQAAAggRAUQgSASgeABQgeAAgRgUgAgXggQgIAMAAAUQAAAsAfABQAPAAAIgMQAJgLAAgWQAAgrgggBQgOAAgJAMg");
	this.shape_528.setTransform(199.425,190.3);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_529.setTransform(179.025,188.45);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_530.setTransform(143.725,190.3);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#00192C").s().p("AgZAbQAXgRAAgKQAAgDgDgDQgMgGAAgLQAAgHAHgFQAGgFAIAAQAJAAAGAGQAHAHAAAJQAAAQgIAMQgHANgaASg");
	this.shape_531.setTransform(123.25,197.725);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_532.setTransform(111.525,190.3);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgZIAQAAIAAgcIAfgMIAAAoIAlAAIAAAZIglAAIAAA6QAAAPAFAHQAEAFAMAAQALABAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_533.setTransform(98.825,188.45);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#00192C").s().p("AAeBBQgGgFgCgGQgEAHgLAFQgJAEgMABQgWgBgNgKQgMgLAAgVQAAgXASgNQARgNAgAAQAGAAAHACQAAgYgeAAQgRAAgNAGIgGgYQAQgJAXAAQAeABAPAOQAOAOAAAoIAAAcQAAAaALAIQgEAGgFACQgFABgGABQgHAAgFgGgAgeAbQAAATAWgBQAcAAAAgcIAAgNIgNgCQglABAAAYg");
	this.shape_534.setTransform(86.95,190.3);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#00192C").s().p("AgvA1QgSgTAAghQAAgeATgVQAUgTAbgBQAeAAASASQARASAAAbQAAAGgCAKIhgAAQABARAKAJQAKAJAQAAQAWAAALgLIANAYQgRAOghAAQgegBgSgRgAAjgNQgEgegdAAQgbAAgGAeIBCAAIAAAAg");
	this.shape_535.setTransform(72.475,190.3);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#00192C").s().p("AgnA1QgSgTAAghQAAgfATgUQAUgTAigBQAYAAARAOIgOAXQgLgKgTAAQgRAAgKAMQgKAMAAAUQAAArAnAAQASAAANgLIAMAYQgOAJgKADQgKACgPAAQgegBgSgRg");
	this.shape_536.setTransform(47.275,190.3);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#00192C").s().p("AgZAbQAXgRAAgKQAAgDgDgDQgMgGABgLQgBgHAHgFQAGgFAIAAQAJAAAGAGQAHAHAAAJQAAAQgHAMQgIANgaASg");
	this.shape_537.setTransform(526.35,165.525);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#00192C").s().p("AgFBFIg+iJIAjAAIAgBSIAihSIAiAAIg/CJg");
	this.shape_538.setTransform(475.3,158.225);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#00192C").s().p("AgOBGQgQgiAAgoQAAgjASgkQARgjAagNIAAASQgaAjABBCQgBBOAaAcIAAAWQgegVgPghg");
	this.shape_539.setTransform(464.1,158.325);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#00192C").s().p("AgzBDQAlAAAAgTQAAgMgLgZIgqhpIAhAAIAkBeIAhheIAhAAIg7CdQgGAOgPAJQgRAJgWAAg");
	this.shape_540.setTransform(444.175,160.775);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#00192C").s().p("AAdBBQgFgEgCgHQgEAIgKAEQgKAEgMAAQgWABgNgLQgMgLAAgVQAAgXASgNQARgNAgAAQAFAAAIACQAAgYgdAAQgSAAgNAGIgGgZQAQgHAXgBQAeAAAPAPQAOAOAAAoIAAAbQAAAbALAIQgEAGgFACQgFABgGAAQgHABgGgGgAgeAbQAAASAWAAQAbAAAAgdIAAgMIgMgCQglAAAAAZg");
	this.shape_541.setTransform(430.5,158.1);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#00192C").s().p("AAlBFIglhSIgkBSIgMAAIgziJIAhAAIAcBQIAhhQIAKAAIAjBQIAdhQIAfAAIgzCJg");
	this.shape_542.setTransform(413.275,158.225);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#00192C").s().p("AgzBDQAlAAAAgTQAAgMgLgZIgqhpIAhAAIAkBeIAhheIAhAAIg7CdQgGAOgPAJQgRAJgWAAg");
	this.shape_543.setTransform(388.325,160.775);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#00192C").s().p("AAeBBQgGgEgBgHQgFAIgLAEQgKAEgLAAQgWABgMgLQgNgLAAgVQAAgXARgNQASgNAgAAQAFAAAIACQAAgYgeAAQgRAAgMAGIgHgZQAQgHAXgBQAeAAAOAPQAPAOAAAoIAAAbQAAAbALAIQgEAGgFACQgFABgGAAQgHABgFgGgAgdAbQAAASAUAAQAcAAAAgdIAAgMIgMgCQgkAAAAAZg");
	this.shape_544.setTransform(359.35,158.1);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgEg+QgGgFAAgIQAAgIAGgFQAEgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgEgFg");
	this.shape_545.setTransform(324.9,155.475);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#00192C").s().p("AgIBeIAAhtIgRAAIAAgaIAwAAIAACHgAgEg+QgGgFAAgIQAAgIAGgFQAEgFAHAAQAIAAAGAFQAFAFAAAIQAAAIgFAFQgGAFgIAAQgHAAgEgFg");
	this.shape_546.setTransform(253.7,155.475);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#00192C").s().p("AgtBFIAAiHIAgAAIAAANQANgPAVAAQARAAAIAFIgOAbQgIgGgKAAQgLAAgIAKQgIAKAAAPIAABMg");
	this.shape_547.setTransform(245.45,157.975);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_548.setTransform(221.225,157.975);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#00192C").s().p("AgnA0QgSgSAAghQAAgfATgTQAUgVAiAAQAYAAARAOIgOAXQgLgKgTAAQgRAAgKAMQgKAMAAAUQAAArAnAAQASAAANgLIAMAZQgOAIgKADQgKABgPAAQgeAAgSgSg");
	this.shape_549.setTransform(192.225,158.1);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#00192C").s().p("AgZBFQgIgDgNgHIALgZQAPALARAAQARAAAAgNQABgHgGgGQgFgEgQgIQgigNAAgaQAAgSANgKQANgJAUgBQAVAAATAKIgJAYQgLgIgSAAQgQAAAAANQAAAFAGAFQAFADARAIQASAGAIAKQAHAKAAAOQAAATgNALQgOALgYgBQgNAAgIgBg");
	this.shape_550.setTransform(172.2,158.1);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAHQAEAFAMABQALAAAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_551.setTransform(161.375,156.25);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_552.setTransform(148.675,157.975);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#00192C").s().p("AguBQQgQgSAAggQAAgfATgUQASgVAcAAQAPAAANAHIAAg3IAggHIAADBIggAAIAAgJQgEAFgJADQgKADgJAAQgcAAgRgSgAgTgDQgKAKAAAWQAAArAoAAQAEAAAHgDQAHgDACgDIAAhGQgKgIgLAAQgSAAgLAMg");
	this.shape_553.setTransform(118.425,155.325);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#00192C").s().p("AgRBNQgLgLAAgVIAAhEIgQAAIAAgaIAQAAIAAgbIAfgMIAAAnIAlAAIAAAaIglAAIAAA7QAAAOAFAHQAEAFAMABQALAAAKgHIAAAdQgLAEgVAAQgTAAgLgMg");
	this.shape_554.setTransform(90.475,156.25);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#00192C").s().p("AgZBFQgIgDgNgHIALgZQAOALASAAQARAAAAgNQABgHgGgGQgFgEgQgIQgigNgBgaQAAgSAOgKQANgJAUgBQAVAAATAKIgJAYQgKgIgTAAQgQAAAAANQAAAFAGAFQAFADARAIQASAGAIAKQAHAKAAAOQABATgOALQgOALgYgBQgNAAgIgBg");
	this.shape_555.setTransform(79.85,158.1);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#00192C").s().p("AAcBFIAAhNQAAgSgHgIQgGgIgPAAQgHAAgHAEQgIAEgFAGIAABhIggAAIAAiHIAXAAIAGANQANgPAYAAQAZAAAOAOQAOAPAAAaIAABSg");
	this.shape_556.setTransform(58.825,157.975);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#00192C").s().p("AAeBBQgGgEgBgHQgFAIgLAEQgKAEgLAAQgWABgMgLQgNgLAAgVQAAgXARgNQASgNAgAAQAFAAAIACQAAgYgdAAQgSAAgMAGIgHgZQAQgHAXgBQAeAAAOAPQAPAOAAAoIAAAbQAAAbALAIQgEAGgFACQgFABgGAAQgHABgFgGgAgdAbQAAASAUAAQAcAAAAgdIAAgMIgMgCQgkAAAAAZg");
	this.shape_557.setTransform(44.35,158.1);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#00192C").s().p("AgwBGQgWgZAAgtQAAgoAYgbQAYgcAlAAQAgAAATANIgOAbQgLgLgYAAQgXAAgOATQgPAUAAAdQAAAeAOASQANARAWAAQAaAAAPgTIAQAbQgUAVgnAAQgmAAgWgag");
	this.shape_558.setTransform(29.475,155.6);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#00192C").s().p("AgHAIQgDgDgBgFQABgEADgDQADgDAEAAQAEAAAEADQAEADAAAEQAAAFgEADQgEADgEAAQgEAAgDgDg");
	this.shape_559.setTransform(520,321.575);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_560.setTransform(514.075,319);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_561.setTransform(499.075,319);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#00192C").s().p("AgOAwIAAg2IgKAAIAAgNIAKAAQABgMAHgIQAGgIALAAQAFAAAJACIgFANIgIgCQgEAAgDAEQgEAEAAAFIAAACIAPAAIAAANIgPAAIAAA2g");
	this.shape_562.setTransform(493.25,317.6);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgGAOQgFgDgFAAQgFAAgEAFQgEAFAAAHIAAAmg");
	this.shape_563.setTransform(483.05,318.925);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_564.setTransform(476.225,319);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#00192C").s().p("AgeAwIAAhdIAPAAIAAAEQAGgGAJAAQAfAAAAAkQABAPgKAKQgJAJgOAAQgHAAgHgDIAAAcgAgPgdIAAAjQAFADAGABQAJgBAFgFQAFgEAAgMQAAgLgFgFQgEgGgKAAQgGABgFAEg");
	this.shape_565.setTransform(468.9,320.25);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_566.setTransform(457.375,319);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAGAAQAFAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_567.setTransform(443.35,318.1);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#00192C").s().p("AgOAwIAAg2IgKAAIAAgNIAKAAQABgMAHgIQAGgIALAAQAFAAAJACIgFANIgIgCQgEAAgDAEQgEAEAAAFIAAACIAPAAIAAANIgPAAIAAA2g");
	this.shape_568.setTransform(434.75,317.6);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_569.setTransform(428.425,319);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_570.setTransform(417.125,319);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgIgDQgRgHAAgNQAAgJAHgEQAGgGAKAAQAKAAAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_571.setTransform(399.3,319);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_572.setTransform(380.025,319);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgJAHgEQAGgGAKAAQALAAAJAGIgFAMQgFgFgJAAQgIAAAAAHQABADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_573.setTransform(369.7,319);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_574.setTransform(359.425,319);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_575.setTransform(352.075,319);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAFAAQAGAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_576.setTransform(345.8,318.1);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgKAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_577.setTransform(321.4,319);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOAAQAQAAAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_578.setTransform(302.675,319);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#00192C").s().p("AgOAzQAMgOAAgmQAAgigMgRIAAgJQANAHAHASQAJARAAASQAAATgHARQgIARgOAKg");
	this.shape_579.setTransform(292.925,319.1);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHACADQADADAFAAQAHAAAEgDIAAAPQgFACgKAAQgJAAgGgHg");
	this.shape_580.setTransform(281.1,318.1);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_581.setTransform(274.825,319);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgGAOQgFgDgFAAQgFAAgEAFQgEAFAAAHIAAAmg");
	this.shape_582.setTransform(264.8,318.925);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#00192C").s().p("AAPAhQgDgDgBgDQgCAEgFACQgFACgGABQgKgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgIAAgGADIgEgNQAJgEAKAAQAPABAIAHQAHAHAAAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_583.setTransform(258.25,319);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_584.setTransform(251.025,319);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#00192C").s().p("AgfAwIAAhdIAQAAIAAAEQAGgGAJAAQAgAAgBAkQABAPgKAKQgIAJgPAAQgIAAgGgDIAAAcgAgPgdIAAAjQAFADAFABQAKgBAFgFQAFgEAAgMQAAgLgFgFQgEgGgLAAQgFABgFAEg");
	this.shape_585.setTransform(243.65,320.25);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#00192C").s().p("AgfAwIAAhdIAQAAIAAAEQAGgGAJAAQAgAAgBAkQAAAPgJAKQgIAJgPAAQgHAAgHgDIAAAcgAgPgdIAAAjQAFADAFABQAKgBAFgFQAFgEAAgMQAAgLgFgFQgEgGgLAAQgFABgFAEg");
	this.shape_586.setTransform(236.1,320.25);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_587.setTransform(228.8,319);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgEgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAHgGAJAAQAKAAAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADADACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_588.setTransform(218.65,319);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_589.setTransform(199.325,319);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_590.setTransform(184.275,319.075);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAGAAQAFAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_591.setTransform(177.85,318.1);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQgBgEgDgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAGgGAKAAQALAAAJAGIgFAMQgFgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_592.setTransform(172.55,319);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_593.setTransform(162.125,319);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIALAAQAIAAAEADIgGAOQgFgDgFAAQgFAAgDAFQgFAFAAAHIAAAmg");
	this.shape_594.setTransform(156,318.925);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_595.setTransform(149.125,319);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGAAQgDABgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAHgGAJAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_596.setTransform(141.55,317.55);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#00192C").s().p("AASAjIgSgpIgSApIgFAAIgahFIARAAIANAoIARgoIAFAAIARAoIAOgoIAQAAIgaBFg");
	this.shape_597.setTransform(132.65,319.075);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgEgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgEAMQgGgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_598.setTransform(120.9,319);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_599.setTransform(110.9,319);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#00192C").s().p("AgXAaQgJgJAAgRQAAgOAKgLQAKgKANAAQAOAAAJAKQAJAJAAANIgBAIIgwAAQABAIAFAFQAFAEAIAAQALAAAFgFIAHALQgJAIgQAAQgPAAgJgKgAARgGQgBgPgPAAQgNAAgDAPIAgAAIAAAAg");
	this.shape_600.setTransform(94.275,319);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAFAAQAGAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_601.setTransform(87.95,318.1);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_602.setTransform(82,319);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_603.setTransform(48.925,319.075);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgDgDQgDgCgIgDQgRgHAAgNQAAgJAHgEQAGgGAKAAQAKAAAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_604.setTransform(42.35,319);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALABQAPAAAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_605.setTransform(493.4,301.9);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#00192C").s().p("AgQAIIAAgPIAhAAIAAAPg");
	this.shape_606.setTransform(483.625,301.55);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_607.setTransform(458.725,301.975);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#00192C").s().p("AgMAOQAMgJAAgFIgCgCQgGgEAAgFQAAgDADgDQADgDAEABQAEgBAEAEQADADAAAEQAAAJgEAFQgDAHgNAIg");
	this.shape_608.setTransform(441.5,305.6);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABgBgHQAAgEgDgCQgCgDgHgDQgSgHAAgNQAAgJAHgEQAHgGAJABQALgBAJAGIgFAMQgFgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_609.setTransform(436.6,301.9);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#00192C").s().p("AAPAhQgDgDgBgDQgCAEgFACQgEACgHABQgLgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgIAAgGADIgEgNQAJgEALABQAOAAAHAHQAIAHAAAUIAAANQAAAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_610.setTransform(411.8,301.9);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgCQgDgDgHgDQgSgHAAgNQAAgJAHgEQAGgGAKABQALgBAJAGIgFAMQgFgFgJAAQgIAAAAAHQABADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_611.setTransform(394,301.9);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_612.setTransform(367.125,300.525);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_613.setTransform(359.625,301.975);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#00192C").s().p("AgIAmQgGgFAAgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHACADQADADAFAAQAHAAAEgDIAAAPQgFACgKAAQgJAAgGgHg");
	this.shape_614.setTransform(353.2,301);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQAAgEgDgCQgDgDgIgDQgRgHAAgNQAAgJAHgEQAGgGAKABQAKgBAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_615.setTransform(347.9,301.9);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#00192C").s().p("AgGAjQgIgRAAgTQAAgSAIgRQAIgSANgHIAAAJQgMARAAAiQAAAmAMAOIAAALQgPgKgGgRg");
	this.shape_616.setTransform(342.925,302);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgCgeQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_617.setTransform(319.3,300.575);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgEACgGABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgJAAgHADIgDgNQAJgEALABQAOAAAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_618.setTransform(309.05,301.9);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_619.setTransform(299.975,301.825);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#00192C").s().p("AgNAwIAAg2IgKAAIAAgNIAKAAQAAgMAHgIQAGgIALAAQAGAAAHACIgEANIgIgCQgEAAgDAEQgEAEAAAGIAAABIAOAAIAAANIgNAAIAAA2g");
	this.shape_620.setTransform(279.35,300.5);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgFABQgLgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgIAAgGADIgEgNQAJgEAKABQAPAAAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_621.setTransform(254.1,301.9);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_622.setTransform(246.775,301.825);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQgBgEgDgCQgCgDgIgDQgRgHAAgNQAAgJAHgEQAGgGAKABQALgBAJAGIgFAMQgFgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_623.setTransform(232.85,301.9);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#00192C").s().p("AgWAjIAAhDIAQAAIAAAGQAGgIAKAAQAJAAAEADIgGAOQgFgDgFAAQgFAAgDAFQgFAFAAAHIAAAmg");
	this.shape_624.setTransform(227.65,301.825);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#00192C").s().p("AgfAwIAAhdIAQAAIAAAEQAGgGAJAAQAfAAAAAkQABAPgKAKQgJAJgOAAQgIAAgGgDIAAAcgAgPgdIAAAjQAFADAFABQAKgBAFgFQAFgEAAgMQAAgLgFgFQgEgGgLAAQgFABgFAEg");
	this.shape_625.setTransform(213.4,303.15);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#00192C").s().p("AgZAhQASAAAAgJQAAgGgFgMIgVg0IARAAIARAuIARguIAQAAIgeBOQgDAGgGAFQgJAEgLAAg");
	this.shape_626.setTransform(202.15,303.225);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_627.setTransform(194.875,301.825);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgJAAgHADIgDgNQAIgEALABQAPAAAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_628.setTransform(187.65,301.9);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALABQAPAAAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_629.setTransform(162.55,301.9);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAJABAAgHQAAgEgDgCQgDgDgIgDQgRgHAAgNQAAgJAHgEQAGgGAKABQAKgBAKAGIgEAMQgGgFgJAAQgIAAAAAHQAAADAEACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_630.setTransform(156.3,301.9);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAPgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHACADQADADAFAAQAHAAAEgDIAAAPQgFACgKAAQgJAAgGgHg");
	this.shape_631.setTransform(147,301);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_632.setTransform(140.775,301.9);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_633.setTransform(133.275,301.825);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#00192C").s().p("AgXAaQgJgKAAgQQAAgOAJgLQAJgKAOABQAQgBAIAKQAJAJAAAQQAAAQgJAKQgJAKgPAAQgOAAgJgKgAgLgQQgEAHAAAJQAAAWAPAAQAHAAAFgFQAEgHAAgKQAAgVgQgBQgGABgFAFg");
	this.shape_634.setTransform(121.875,301.9);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#00192C").s().p("AgiAvIAAhcIAagBQATAAALAMQAMAMABAUQgBAxgvAAgAgRgfIAAA/IAJAAQALAAAHgJQAIgJAAgPQAAgegbAAg");
	this.shape_635.setTransform(114.25,300.625);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#00192C").s().p("AgHAIQgEgDABgFQgBgEAEgDQADgDAEAAQAFAAADADQAEADgBAEQABAFgEADQgDADgFAAQgEAAgDgDg");
	this.shape_636.setTransform(103.45,304.475);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_637.setTransform(95.625,301.825);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGAAQgDABgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAHgGAJAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_638.setTransform(78.75,300.45);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGAAQgDABgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAGgGAKAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_639.setTransform(62,300.45);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHABADQADADAGAAQAFAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_640.setTransform(55.55,301);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgFABQgMgBgGgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_641.setTransform(497,284.8);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABAAgHQgBgEgDgDQgCgCgIgDQgRgHAAgNQAAgJAHgEQAGgGAKAAQALAAAJAGIgFAMQgFgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_642.setTransform(483.05,284.8);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_643.setTransform(472.525,284.875);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#00192C").s().p("AgZAhQASAAAAgJQAAgGgFgMIgVg0IAQAAIASAuIAQguIARAAIgeBOQgDAGgGAFQgJAEgLAAg");
	this.shape_644.setTransform(457.9,286.125);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_645.setTransform(440.225,284.725);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAOgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHADADQACADAFAAQAGAAAGgDIAAAPQgGACgKAAQgKAAgFgHg");
	this.shape_646.setTransform(422.25,283.9);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#00192C").s().p("AgZAhQASAAAAgJQAAgGgFgMIgVg0IARAAIARAuIAQguIARAAIgeBOQgDAGgGAFQgJAEgLAAg");
	this.shape_647.setTransform(416.25,286.125);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_648.setTransform(408.975,284.725);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#00192C").s().p("AAPAhQgDgDAAgDQgDAEgFACQgEACgGABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgOAAQgJAAgHADIgDgNQAJgEALAAQAOABAHAHQAIAHgBAUIAAANQABAOAFADIgEAFIgGABQgDAAgDgDgAgOANQAAAJALAAQANAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_649.setTransform(401.75,284.8);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#00192C").s().p("AgIAmQgFgFgBgLIAAghIgIAAIAAgNIAIAAIAAgOIAQgGIAAAUIASAAIAAANIgSAAIAAAdQAAAHACADQACADAGAAQAFAAAFgDIAAAPQgFACgLAAQgIAAgGgHg");
	this.shape_650.setTransform(384.4,283.9);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_651.setTransform(368.575,284.725);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgJAHgEQAGgGAKAAQALAAAJAGIgEAMQgGgFgJAAQgIAAAAAHQABADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_652.setTransform(350.8,284.8);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#00192C").s().p("AgMAiIgLgFIAGgMQAHAGAJgBQAJABgBgHQAAgEgDgDQgCgCgHgDQgSgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgFAMQgFgFgJAAQgHAAAAAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_653.setTransform(345.25,284.8);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_654.setTransform(333.025,284.725);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#00192C").s().p("AgfAwIAAhdIAQAAIAAAEQAGgGAJAAQAgAAgBAkQAAAPgJAKQgIAJgPAAQgHAAgHgDIAAAcgAgPgdIAAAjQAFADAFABQAKgBAFgFQAFgEAAgMQAAgLgFgFQgEgGgLABQgFAAgFAEg");
	this.shape_655.setTransform(310.8,286.05);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#00192C").s().p("AgOAzQAMgOAAgmQAAgigMgRIAAgJQANAHAHASQAJARAAASQAAATgHARQgIARgOAKg");
	this.shape_656.setTransform(300.825,284.9);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#00192C").s().p("AgZAhQASAAAAgJQAAgGgFgMIgVg0IAQAAIASAuIAQguIARAAIgeBOQgCAGgIAFQgIAEgLAAg");
	this.shape_657.setTransform(294.8,286.125);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#00192C").s().p("AgKAiIAAhPIAOgDIAABLQAAANAHACQgDAHgIAAQgKAAAAgPg");
	this.shape_658.setTransform(289.85,283.425);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_659.setTransform(283.725,284.725);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#00192C").s().p("AASAjIgSgpIgSApIgFAAIgahFIARAAIANAoIARgoIAFAAIARAoIAOgoIAQAAIgaBFg");
	this.shape_660.setTransform(263.6,284.875);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#00192C").s().p("AgDAvIAAg2IgJAAIAAgNIAYAAIAABDgAgBgeQgDgDAAgEQAAgEADgCQABgDAEAAQAEAAACADQADACAAAEQAAAEgDADQgCACgEAAQgEAAgBgCg");
	this.shape_661.setTransform(248.9,283.475);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#00192C").s().p("AgGAjQgIgRAAgTQAAgSAIgRQAIgSANgHIAAAJQgMARAAAiQAAAmAMAOIAAALQgPgKgGgRg");
	this.shape_662.setTransform(237.775,284.9);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#00192C").s().p("AgCAjIgfhFIARAAIAQApIARgpIARAAIgfBFg");
	this.shape_663.setTransform(220.425,284.875);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#00192C").s().p("AAPAhQgCgDgCgDQgCAEgFACQgFACgGABQgKgBgHgFQgGgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgIAAgGADIgEgNQAJgEAKAAQAPABAIAHQAGAHABAUIAAANQgBAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_664.setTransform(213.6,284.8);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#00192C").s().p("AAOAwIAAgpQAAgGgEgEQgEgEgGABQgDAAgEACQgEACgCACIAAAwIgQAAIAAhcIAQgEIAAAiQAHgGAJAAQANAAAHAHQAHAIAAAMIAAApg");
	this.shape_665.setTransform(206.25,283.35);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgDgDQgCgCgHgDQgSgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgFAMQgFgFgJAAQgIAAABAHQAAADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_666.setTransform(195.75,284.8);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#00192C").s().p("AAOAjIAAgnQAAgIgDgEQgEgEgHAAQgDAAgEACQgEACgCADIAAAwIgQAAIAAhDIAMAAIADAGQAGgIAMAAQAMAAAHAIQAHAHAAANIAAApg");
	this.shape_667.setTransform(183.975,284.725);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#00192C").s().p("AgWAoQgIgJAAgQQAAgPAJgKQAJgLANAAQAIAAAHAEIAAgcIAPgDIAABgIgPAAIAAgEQgCACgFABQgFACgEAAQgOAAgIgJgAgJgBQgFAFAAAKQAAAWAUAAIAFgCIAFgCIAAgjQgGgEgFAAQgJAAgFAGg");
	this.shape_668.setTransform(168.875,283.425);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_669.setTransform(161.375,284.875);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#00192C").s().p("AgIAmQgGgFABgLIAAghIgIAAIAAgNIAIAAIAAgOIAOgGIAAAUIATAAIAAANIgTAAIAAAdQAAAHADADQACADAFAAQAGAAAGgDIAAAPQgGACgKAAQgKAAgFgHg");
	this.shape_670.setTransform(154.95,283.9);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgCgDQgDgCgHgDQgSgHAAgNQAAgJAHgEQAGgGAKAAQALAAAJAGIgFAMQgFgFgJAAQgIAAAAAHQABADADACQACACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_671.setTransform(149.65,284.8);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#00192C").s().p("AgdAJIAAgrIAQAAIAAAqQAAANAMAAQAEAAAFgDQAFgCABgEIAAguIAQAAIAABDIgQAAIAAgFQgDACgGACQgFADgFAAQgYAAAAgag");
	this.shape_672.setTransform(126.125,284.875);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#00192C").s().p("AAgAjIAAgqQAAgNgMAAQgEAAgDACQgEACgBADIAAAwIgPAAIAAgsQAAgFgDgDQgDgDgGAAQgDAAgDACIgFAFIAAAwIgQAAIAAhDIALAAIADAGQAHgIAKAAQAOAAAFAIQADgEAGgBQAFgDAFAAQAMAAAGAHQAGAHAAALIAAAsg");
	this.shape_673.setTransform(85.825,284.725);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#00192C").s().p("AgMAiIgKgFIAFgMQAHAGAJgBQAIABAAgHQAAgEgDgDQgCgCgHgDQgSgHAAgNQAAgJAHgEQAHgGAJAAQALAAAJAGIgFAMQgFgFgJAAQgIAAABAHQAAADACACQADACAIADQAJAEAEAEQAEAFAAAHQAAAJgHAGQgHAFgLABQgHgBgEgBg");
	this.shape_674.setTransform(66.15,284.8);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#00192C").s().p("AAPAhQgCgDgBgDQgDAEgFACQgFACgFABQgMgBgFgFQgHgGAAgKQAAgLAJgHQAJgGAPAAIAHABQAAgMgPAAQgJAAgGADIgDgNQAIgEALAAQAPABAIAHQAGAHAAAUIAAANQAAAOAGADIgEAFIgGABQgDAAgDgDgAgOANQAAAJAKAAQAOAAAAgNIAAgHIgGgBQgSAAAAAMg");
	this.shape_675.setTransform(59.95,284.8);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#F2F2F2").s().p("AhABGQgZgYABgsQAAgqAbgbQAagbAlAAQAnAAAYAYQAZAYAAAkQAAAIgEAPIiCAAQABAWAOAMQAOAMAXAAQAdAAAPgPIAQAgQgWATgtAAQgoAAgZgZgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_676.setTransform(393.5,239.95);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#F2F2F2").s().p("AhPBuIAbgiQAWAUAcABQASAAALgGQAMgGAAgJQAAgQgaAAIgVACIgVACQgsAAAAghQAAgIAHgJQAIgJAKgEQgggTAAglQAAgeAWgTQAVgUAfAAQAYAAAQAKIASgTIAdAbIgUAOQALAQgBAWQAAAggSASQgUASgdAAIgLgBIgHgBIgJAEQgIAEAAADQAAAHAMAAIASgCQALgDAIAAQA/AAAAAyQAAAcgZAPQgZAQgiABQgqAAgigZgAgbhPQgJAJgBAPQAAAQAJAKQAKAKAPAAQAOAAAIgKQAIgKAAgQQABgOgKgKQgIgKgNABQgPAAgJAJg");
	this.shape_677.setTransform(309.75,242.85);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#F2F2F2").s().p("AApBYQgIgHgDgIQgGAKgOAGQgOAGgPAAQgeAAgQgPQgSgPABgbQAAgfAXgSQAYgSArAAQAIAAAKADQAAgggoAAQgYAAgQAIIgJgiQAVgKAfAAQApAAAUATQATATAAA1IAAAnQAAAkAOAKQgFAIgGADQgHACgIAAQgKAAgGgHgAgnAlQAAAYAcAAQAlAAAAgnIAAgRIgQgCQgxAAAAAig");
	this.shape_678.setTransform(291.65,239.95);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#F2F2F2").s().p("Ag1BGQgZgYAAgsQAAgqAbgcQAbgaAtAAQAgAAAYASIgSAgQgPgOgaAAQgXAAgOAQQgOAQAAAcQAAA5A2AAQAXAAATgQIAQAiQgTAMgOADQgOADgTAAQgqAAgYgZg");
	this.shape_679.setTransform(198.05,239.95);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAPAAQAQAAANgJIAAAoQgOAFgcAAQgbAAgOgQg");
	this.shape_680.setTransform(162,237.475);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#F2F2F2").s().p("AhABFQgXgaAAgrQAAgqAYgaQAYgaAnAAQAqAAAXAaQAXAYAAAsQAAAsgXAZQgYAagpAAQgoAAgYgagAgegrQgMAPAAAcQAAA8AqAAQAUAAAMgPQALgRAAgcQAAg7grAAQgTAAgLAQg");
	this.shape_681.setTransform(145.25,239.95);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQARgUAeAAQAWAAALAGIgSAlQgMgHgNAAQgPAAgKANQgMAOAAATIAABng");
	this.shape_682.setTransform(128.9,239.775);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#F2F2F2").s().p("AhUCBIAAj+IArAAIAAANQAQgQAXAAQBXAAAABgQAAAsgYAYQgYAZgpAAQgVAAgQgIIAABMgAgphQIAABfQAMAKAPAAQAcAAANgOQANgOABgeQgBgggNgOQgMgNgdAAQgPAAgMAMg");
	this.shape_683.setTransform(110.5,243.375);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#F2F2F2").s().p("AApBYQgIgHgCgIQgHAKgNAGQgPAGgPAAQgeAAgQgPQgRgPgBgbQAAgfAZgSQAYgSAqAAQAHAAALADQAAgggoAAQgYAAgQAIIgKgiQAWgKAfAAQApAAAUATQATATAAA1IAAAnQAAAkAPAKQgGAIgGADQgHACgIAAQgJAAgHgHgAgnAlQgBAYAdAAQAlAAAAgnIAAgRIgQgCQgyAAABAig");
	this.shape_684.setTransform(485,197.3);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAPAAQAQAAANgJIAAAoQgOAFgcAAQgaAAgPgQg");
	this.shape_685.setTransform(468.55,194.825);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#F2F2F2").s().p("AAoBYQgHgHgDgIQgFAKgOAGQgPAGgPAAQgdAAgSgPQgQgPAAgbQgBgfAYgSQAZgSAqAAQAHAAALADQAAgggoAAQgYAAgQAIIgJgiQAVgKAfAAQApAAATATQAUATAAA1IAAAnQAAAkAOAKQgEAIgHADQgHACgIAAQgJAAgIgHgAgoAlQAAAYAdAAQAmAAAAgnIAAgRIgRgCQgxAAgBAig");
	this.shape_686.setTransform(452.55,197.3);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#F2F2F2").s().p("Ag+BsQgVgYAAgrQgBgrAagbQAZgbAlAAQAVgBARAJIAAhJIArgLIAAEFIgrAAIAAgLQgGAFgMAFQgNAEgNABQgmgBgWgYgAgZgFQgOAPAAAdQAAA6A2AAQAGgBAJgDQAJgEADgDIAAhfQgOgLgOAAQgZAAgOAPg");
	this.shape_687.setTransform(432.7,193.55);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#F2F2F2").s().p("AAoBYQgHgHgDgIQgFAKgPAGQgOAGgPAAQgdAAgRgPQgSgPABgbQAAgfAXgSQAYgSArAAQAIAAAKADQAAgggoAAQgYAAgQAIIgJgiQAVgKAfAAQApAAATATQAUATAAA1IAAAnQAAAkAOAKQgEAIgHADQgHACgIAAQgJAAgIgHgAgoAlQAAAYAdAAQAmAAAAgnIAAgRIgRgCQgyAAAAAig");
	this.shape_688.setTransform(403.15,197.3);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#F2F2F2").s().p("AgmCBIAAiTIgbAAIAAgjIAbAAQABghATgWQASgUAdAAQAPAAAWAGIgNAhQgOgFgHABQgMgBgJALQgIAKAAAQIAAAEIAmAAIAAAjIglAAIAACTg");
	this.shape_689.setTransform(342.725,193.55);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#F2F2F2").s().p("Ag9BsQgXgYAAgrQABgrAZgbQAZgbAlAAQAUgBASAJIAAhJIArgLIAAEFIgrAAIAAgLQgGAFgMAFQgNAEgNABQglgBgWgYgAgZgFQgOAPAAAdQAAA6A2AAQAGgBAJgDQAJgEADgDIAAhfQgOgLgPAAQgZAAgNAPg");
	this.shape_690.setTransform(314.65,193.55);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#F2F2F2").s().p("AhABHQgZgZABgsQAAgqAagbQAbgbAkAAQAoAAAYAYQAZAYAAAlQgBAHgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgpAAgYgYgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_691.setTransform(294.7,197.3);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgpAZgbQAYgaAmAAQAqAAAXAZQAXAZAAAsQAAArgYAaQgXAagpAAQgpAAgWgagAgfgrQgMAQAAAbQAAA8ArAAQAUAAAMgPQAMgRAAgcQAAg7gsAAQgTAAgMAQg");
	this.shape_692.setTransform(223.5,197.3);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_693.setTransform(203.275,197.125);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#F2F2F2").s().p("AhABHQgYgZAAgsQAAgqAbgbQAagbAlAAQAoAAAYAYQAYAYAAAlQAAAHgEAPIiCAAQABAWAOAMQAOAMAWAAQAeAAAPgPIAQAgQgWATgtAAQgoAAgZgYgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_694.setTransform(136.45,197.3);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQARgUAdAAQAXAAALAGIgSAlQgMgHgOAAQgOAAgLANQgLAOAAATIAABng");
	this.shape_695.setTransform(119.95,197.125);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#F2F2F2").s().p("AhABHQgYgZgBgsQAAgqAbgbQAbgbAkAAQApAAAXAYQAYAYAAAlQAAAHgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgoAAgZgYgAAugSQgEgogoAAQgjAAgJAoIBYAAIAAAAg");
	this.shape_696.setTransform(101.4,197.3);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#F2F2F2").s().p("AgXBoQgPgPAAgdIAAhbIgVAAIAAgjIAVAAIAAglIAqgQIAAA1IAyAAIAAAjIgyAAIAABPQAAATAGAJQAGAIAPAAQAQAAANgJIAAAoQgPAFgbAAQgaAAgPgQg");
	this.shape_697.setTransform(63.65,194.825);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgJIAPgiQATAPAYAAQAYAAAAgSQAAgKgIgHQgHgGgVgKQgvgTAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAJQAYAKALANQAKANAAATQAAAagSAPQgTAOggAAQgSAAgLgDg");
	this.shape_698.setTransform(468.925,154.65);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#F2F2F2").s().p("AhABHQgYgZAAgsQAAgrAbgaQAagbAlAAQAoAAAYAYQAYAXgBAmQAAAHgDAPIiCAAQABAWAOAMQAOAMAWAAQAdAAAQgPIAQAgQgWATgtAAQgoAAgZgYgAAvgSQgFgogoAAQgjAAgJAoIBZAAIAAAAg");
	this.shape_699.setTransform(451.35,154.65);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgJIAPgiQATAPAYAAQAYAAAAgSQAAgKgIgHQgHgGgVgKQgvgTAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAJQAYAKALANQAKANAAATQAAAagSAPQgTAOggAAQgSAAgLgDg");
	this.shape_700.setTransform(433.775,154.65);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_701.setTransform(415.925,154.475);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgpAYgbQAZgaAmAAQAqAAAXAZQAXAaAAArQAAArgYAaQgXAagpAAQgoAAgXgagAgegrQgNAQAAAbQAAA8ArAAQAUAAAMgPQALgQAAgdQAAg7grAAQgTAAgLAQg");
	this.shape_702.setTransform(395.7,154.65);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#F2F2F2").s().p("AhUCBIAAj+IArAAIAAANQAQgQAYAAQBWAAAABgQAAAsgYAYQgYAZgpAAQgVAAgQgIIAABMgAgphQIAABfQAMAKAPAAQAcAAANgOQAOgOAAgeQAAgggOgOQgMgNgdAAQgPAAgMAMg");
	this.shape_703.setTransform(375.9,158.075);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgJIAPgiQATAPAYAAQAYAAAAgSQAAgKgIgHQgHgGgVgKQgvgTAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAJQAYAKALANQAKANAAATQAAAagSAPQgTAOggAAQgSAAgLgDg");
	this.shape_704.setTransform(357.925,154.65);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#F2F2F2").s().p("AhABHQgYgZgBgsQAAgrAbgaQAbgbAkAAQApAAAXAYQAYAXAAAmQAAAHgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgoAAgZgYgAAugSQgEgogoAAQgjAAgJAoIBYAAIAAAAg");
	this.shape_705.setTransform(340.35,154.65);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#F2F2F2").s().p("Ag9BdIAAi2IArAAIAAARQASgUAcAAQAXAAALAGIgSAlQgMgHgNAAQgPAAgKANQgMAOAAATIAABng");
	this.shape_706.setTransform(323.85,154.475);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#F2F2F2").s().p("AhABFQgXgaAAgrQAAgpAYgbQAZgaAmAAQAqAAAXAZQAXAaAAArQAAArgYAaQgXAagpAAQgoAAgYgagAgegrQgNAQAAAbQAAA8ArAAQAUAAAMgPQALgQAAgdQAAg7grAAQgTAAgLAQg");
	this.shape_707.setTransform(259.35,154.65);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#F2F2F2").s().p("AhFBaQAxAAAAgaQAAgPgNgjIg5iMIArAAIAyB+IAth+IAsAAIhRDTQgHASgUANQgXAMgeAAg");
	this.shape_708.setTransform(240.05,158.25);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#F2F2F2").s().p("AAmBdIAAhpQAAgXgJgLQgJgKgUAAQgJAAgLAFQgKAFgGAIIAACDIgrAAIAAi2IAfAAIAHARQASgUAhAAQAhAAASATQATAUAAAjIAABvg");
	this.shape_709.setTransform(209.975,154.475);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#F2F2F2").s().p("Ag/BFQgYgaAAgrQAAgpAZgbQAYgaAmAAQAqAAAXAZQAXAaAAArQAAArgYAaQgXAagpAAQgpAAgWgagAgfgrQgMAQAAAbQAAA8ArAAQAUAAAMgPQAMgQAAgdQAAg7gsAAQgTAAgMAQg");
	this.shape_710.setTransform(189.75,154.65);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#F2F2F2").s().p("Ag9BsQgXgYAAgrQABgrAZgbQAZgcAlABQAUAAASAIIAAhJIAqgLIAAEFIgqAAIAAgLQgGAGgMAEQgNAEgNABQglgBgWgYgAgZgEQgOAOAAAeQAAA5A2AAQAGgBAJgDQAJgEADgDIAAhgQgOgKgPAAQgZAAgNAQg");
	this.shape_711.setTransform(158.95,150.9);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#F2F2F2").s().p("AhABHQgZgZABgsQgBgrAbgaQAbgbAkAAQAoAAAYAYQAZAXAAAmQgBAHgDAPIiCAAQACAWAOAMQANAMAXAAQAcAAAQgPIARAgQgXATgtAAQgpAAgYgYgAAugSQgEgogoAAQgkAAgIAoIBYAAIAAAAg");
	this.shape_712.setTransform(139,154.65);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#F2F2F2").s().p("AgiBcQgLgDgRgJIAPgiQATAPAYAAQAYAAAAgSQAAgKgIgHQgHgGgVgKQgvgTAAgiQAAgYASgNQASgOAbAAQAdAAAZANIgMAhQgOgMgZAAQgWAAAAASQAAAHAIAFQAHAGAXAJQAYAKALANQAKANAAATQAAAagSAPQgTAOggAAQgSAAgLgDg");
	this.shape_713.setTransform(121.425,154.65);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#F2F2F2").s().p("AApBYQgIgHgCgIQgHAKgNAGQgPAGgPAAQgeAAgRgPQgQgOgBgcQAAggAZgQQAYgTAqABQAHAAALACQAAgggoAAQgYAAgQAIIgKgiQAWgKAfAAQApAAAUATQATATAAA1IAAAnQAAAkAPAKQgGAIgGADQgHACgIAAQgJAAgHgHgAgnAlQgBAYAdAAQAlAAAAgnIAAgRIgQgCQgyAAABAig");
	this.shape_714.setTransform(104.75,154.65);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#F2F2F2").s().p("AhUB+IAAj5IBIgCQAlAAAXAQQAVARAAAfQABAeggARQAvAPAAAzQgBAigZAUQgaAUgoAAgAgnAGIAABTIAWABQAcAAAOgKQAOgKAAgXQAAgWgNgJQgNgKgdAAgAgnhXIAAA8IAVAAQArAAAAggQAAgdgmAAg");
	this.shape_715.setTransform(85.5,151.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51,p:{x:100.825,y:152.175}},{t:this.shape_50},{t:this.shape_49,p:{x:124.65,y:151.775}},{t:this.shape_48,p:{x:132.3,y:151.775}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45,p:{x:172.275,y:154.675}},{t:this.shape_44,p:{x:187.325,y:151.775}},{t:this.shape_43},{t:this.shape_42,p:{x:217.575,y:154.425}},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27,p:{x:435.475,y:154.425}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{x:113.675,y:186.875}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21,p:{x:153.7,y:186.625}},{t:this.shape_20},{t:this.shape_19,p:{x:185.2,y:183.975}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{x:296.35,y:184.125}},{t:this.shape_10,p:{x:308.325,y:186.625}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{x:365.95,y:184.125}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:433.5,y:183.975}},{t:this.shape}]}).to({state:[{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345,p:{x:263.2,y:154.475}},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340,p:{x:355.225,y:154.475}},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160,p:{x:199.675,y:295.625}},{t:this.shape_159},{t:this.shape_158,p:{x:215.1,y:294.325}},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155,p:{x:236.125,y:295.775}},{t:this.shape_154},{t:this.shape_153,p:{x:247.475,y:294.325}},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149,p:{x:281.125,y:294.325}},{t:this.shape_148,p:{x:286.65,y:294.375}},{t:this.shape_147},{t:this.shape_146,p:{x:295.65,y:294.375}},{t:this.shape_145,p:{x:301.625,y:295.625}},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139,p:{x:343.8,y:295.775}},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132,p:{x:231.075,y:312.725}},{t:this.shape_131,p:{x:242.125,y:312.8}},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127,p:{x:266.7,y:311.425}},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122,p:{x:301.125,y:312.725}},{t:this.shape_121},{t:this.shape_120,p:{x:315.175,y:313.875}},{t:this.shape_119,p:{x:320.05,y:311.475}},{t:this.shape_118},{t:this.shape_117,p:{x:211.675,y:328.625}},{t:this.shape_116},{t:this.shape_115,p:{x:223.25,y:328.575}},{t:this.shape_114,p:{x:229.075,y:328.525}},{t:this.shape_113,p:{x:239.1,y:328.525}},{t:this.shape_112,p:{x:242.3,y:328.575}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109,p:{x:262.375,y:329.825}},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103,p:{x:309.375,y:329.825}},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99,p:{x:334.25,y:328.575}},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93,p:{x:187.35,y:346.925}},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90,p:{x:211.975,y:347.075}},{t:this.shape_89},{t:this.shape_88,p:{x:226,y:346.925}},{t:this.shape_87},{t:this.shape_86,p:{x:235.65,y:345.675}},{t:this.shape_85},{t:this.shape_84,p:{x:248.975,y:346.925}},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80,p:{x:280.95,y:345.625}},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76,p:{x:298.5,y:345.675}},{t:this.shape_75,p:{x:304.475,y:346.925}},{t:this.shape_74},{t:this.shape_73,p:{x:319.025,y:346.925}},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70,p:{x:340.625,y:345.625}},{t:this.shape_69},{t:this.shape_68,p:{x:354.8,y:345.675}},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65,p:{x:377.375,y:347.075}},{t:this.shape_64,p:{x:382.9,y:345.675}},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59,p:{x:258.15,y:364.025}},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56,p:{x:279.275,y:364.025}},{t:this.shape_55},{t:this.shape_54,p:{x:290.2,y:362.725}},{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_51,p:{x:114.775,y:155.725}},{t:this.shape_6,p:{x:129.7,y:155.475}},{t:this.shape_49,p:{x:138.6,y:155.325}},{t:this.shape_48,p:{x:146.25,y:155.325}},{t:this.shape_362},{t:this.shape_361,p:{x:173.325}},{t:this.shape_24,p:{x:186.225,y:158.225}},{t:this.shape_360,p:{x:201.275,y:155.325}},{t:this.shape_359,p:{x:216.425}},{t:this.shape_42,p:{x:231.525,y:157.975}},{t:this.shape_358,p:{x:244.225}},{t:this.shape_357},{t:this.shape_27,p:{x:276.075,y:157.975}},{t:this.shape_356,p:{x:291.175}},{t:this.shape_355,p:{x:306.075}},{t:this.shape_44,p:{x:320.875,y:155.325}},{t:this.shape_354,p:{x:341.425}},{t:this.shape_353,p:{x:354.025}},{t:this.shape_1,p:{x:373.75,y:155.325}},{t:this.shape_352,p:{x:384.175}},{t:this.shape_351},{t:this.shape_350,p:{x:415.8,y:155.475}},{t:this.shape_10,p:{x:427.775,y:157.975}},{t:this.shape_349},{t:this.yes_button2}]},1).to({state:[{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488,p:{x:64.95}},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481,p:{x:181.075}},{t:this.shape_480},{t:this.shape_479},{t:this.shape_345,p:{x:246.55,y:197.125}},{t:this.shape_478},{t:this.shape_477,p:{x:283.15}},{t:this.shape_340,p:{x:308.225,y:197.125}},{t:this.shape_476},{t:this.shape_475,p:{x:353.675,y:197.125}},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471,p:{x:433,y:194.825}},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468,p:{x:495.425}},{t:this.shape_467},{t:this.shape_466,p:{x:523.675}},{t:this.shape_465},{t:this.shape_464,p:{x:48.4}},{t:this.shape_463,p:{x:64.75}},{t:this.shape_462},{t:this.shape_461,p:{x:98.825,y:236.4}},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458,p:{x:153.5,y:239.775}},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453,p:{x:252.1,y:239.775}},{t:this.shape_452,p:{x:268.6}},{t:this.shape_451,p:{x:293.775}},{t:this.shape_450,p:{x:306.4}},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447,p:{x:370.725}},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444,p:{x:452.825,y:240.125}},{t:this.shape_443},{t:this.shape_442,p:{x:488.25}},{t:this.shape_441},{t:this.shape_440,p:{x:524.65}},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436,p:{x:49}},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_132,p:{x:87.125,y:284.725}},{t:this.shape_431},{t:this.shape_148,p:{x:98.2,y:283.475}},{t:this.shape_149,p:{x:104.025,y:283.425}},{t:this.shape_430,p:{x:111.575}},{t:this.shape_429},{t:this.shape_428},{t:this.shape_122,p:{x:135.475,y:284.725}},{t:this.shape_427,p:{x:142.75,y:286.125}},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423,p:{x:169.675}},{t:this.shape_422},{t:this.shape_109,p:{x:182.775,y:284.725}},{t:this.shape_421},{t:this.shape_420,p:{x:196.05,y:283.9}},{t:this.shape_146,p:{x:200.35,y:283.475}},{t:this.shape_90,p:{x:205.925,y:284.875}},{t:this.shape_419,p:{x:213.075}},{t:this.shape_418},{t:this.shape_417},{t:this.shape_86,p:{x:238.1,y:283.475}},{t:this.shape_416,p:{x:242.8,y:283.9}},{t:this.shape_415},{t:this.shape_119,p:{x:254.8,y:283.475}},{t:this.shape_84,p:{x:260.775,y:284.725}},{t:this.shape_414,p:{x:271.05,y:283.9}},{t:this.shape_413,p:{x:277.5}},{t:this.shape_412,p:{x:285.075}},{t:this.shape_411,p:{x:296.425}},{t:this.shape_410},{t:this.shape_76,p:{x:309,y:283.475}},{t:this.shape_409,p:{x:313.95}},{t:this.shape_408,p:{x:319.25,y:283.9}},{t:this.shape_112,p:{x:323.55,y:283.475}},{t:this.shape_75,p:{x:329.525,y:284.725}},{t:this.shape_120,p:{x:336.675,y:285.875}},{t:this.shape_407},{t:this.shape_406,p:{x:354.975}},{t:this.shape_405,p:{x:361.8}},{t:this.shape_404,p:{x:366.75,y:283.9}},{t:this.shape_403},{t:this.shape_402,p:{x:377.825}},{t:this.shape_80,p:{x:383.8,y:283.425}},{t:this.shape_99,p:{x:387,y:283.475}},{t:this.shape_401,p:{x:392.825}},{t:this.shape_400},{t:this.shape_117,p:{x:409.175,y:283.525}},{t:this.shape_54,p:{x:415.05,y:283.425}},{t:this.shape_399,p:{x:420.275}},{t:this.shape_398,p:{x:427.5,y:284.8}},{t:this.shape_397,p:{x:433.7}},{t:this.shape_396,p:{x:440.175}},{t:this.shape_395},{t:this.shape_394,p:{x:456.75}},{t:this.shape_64,p:{x:459.95,y:283.475}},{t:this.shape_393},{t:this.shape_392,p:{x:472.725}},{t:this.shape_391,p:{x:483.6}},{t:this.shape_390,p:{x:491.175}},{t:this.shape_389,p:{x:498.05}},{t:this.shape_388,p:{x:504.175}},{t:this.shape_387,p:{x:514.35}},{t:this.shape_386,p:{x:520.625}},{t:this.shape_93,p:{x:159.55,y:301.825}},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383,p:{x:180.775,y:301.975}},{t:this.shape_382,p:{x:188.325}},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379,p:{x:209.2,y:301}},{t:this.shape_378,p:{x:215.475}},{t:this.shape_377,p:{x:226.9,y:300.45}},{t:this.shape_376},{t:this.shape_65,p:{x:241.075,y:301.975}},{t:this.shape_375,p:{x:248.225}},{t:this.shape_374,p:{x:259.35}},{t:this.shape_73,p:{x:270.475,y:301.825}},{t:this.shape_373,p:{x:278.025}},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370,p:{x:304.625}},{t:this.shape_369,p:{x:311.975}},{t:this.shape_158,p:{x:317.95,y:300.525}},{t:this.shape_368},{t:this.shape_367,p:{x:333.675}},{t:this.shape_56,p:{x:341.175,y:301.825}},{t:this.shape_366},{t:this.shape_68,p:{x:352.25,y:300.575}},{t:this.shape_114,p:{x:358.075,y:300.525}},{t:this.shape_365,p:{x:365.625}},{t:this.shape_88,p:{x:372.5,y:301.825}},{t:this.shape_364,p:{x:378.625}},{t:this.shape_70,p:{x:386.025,y:300.525}},{t:this.shape_363}]},1).to({state:[{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_45,p:{x:103.375,y:158.225}},{t:this.shape_553},{t:this.shape_359,p:{x:133.575}},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_353,p:{x:206.225}},{t:this.shape_548},{t:this.shape_361,p:{x:233.925}},{t:this.shape_547},{t:this.shape_546},{t:this.shape_19,p:{x:265.75,y:155.325}},{t:this.shape_24,p:{x:280.775,y:158.225}},{t:this.shape_358,p:{x:293.525}},{t:this.shape_356,p:{x:306.225}},{t:this.shape_545},{t:this.shape_42,p:{x:336.875,y:157.975}},{t:this.shape_544},{t:this.shape_27,p:{x:373.825,y:157.975}},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_352,p:{x:489.525}},{t:this.shape_354,p:{x:501.925}},{t:this.shape_355,p:{x:514.625}},{t:this.shape_537},{t:this.shape_536},{t:this.shape_21,p:{x:60.2,y:190.175}},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_360,p:{x:158.525,y:187.525}},{t:this.shape_350,p:{x:169.65,y:187.675}},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_44,p:{x:233.025,y:187.525}},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_11,p:{x:377.9,y:187.675}},{t:this.shape_10,p:{x:389.875,y:190.175}},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.yes_button3},{t:this.no_button3}]},1).to({state:[{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_444,p:{x:279.575,y:154.825}},{t:this.shape_458,p:{x:298.4,y:154.475}},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_468,p:{x:81.025}},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_461,p:{x:161.625,y:193.75}},{t:this.shape_466,p:{x:174.925}},{t:this.shape_693},{t:this.shape_692},{t:this.shape_481,p:{x:254.225}},{t:this.shape_477,p:{x:274.6}},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_488,p:{x:358.35}},{t:this.shape_453,p:{x:376.75,y:197.125}},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_452,p:{x:179.05}},{t:this.shape_679},{t:this.shape_471,p:{x:213.85,y:237.475}},{t:this.shape_451,p:{x:225.475}},{t:this.shape_463,p:{x:241.15}},{t:this.shape_475,p:{x:261.375,y:239.775}},{t:this.shape_678},{t:this.shape_677},{t:this.shape_464,p:{x:326.85}},{t:this.shape_442,p:{x:343.35}},{t:this.shape_340,p:{x:368.425,y:239.775}},{t:this.shape_676},{t:this.shape_447,p:{x:413.875}},{t:this.shape_450,p:{x:431.05}},{t:this.shape_440,p:{x:444.1}},{t:this.shape_117,p:{x:41.625,y:283.525}},{t:this.shape_394,p:{x:47.5}},{t:this.shape_430,p:{x:52.725}},{t:this.shape_675},{t:this.shape_674},{t:this.shape_423,p:{x:72.625}},{t:this.shape_673},{t:this.shape_436,p:{x:94.9}},{t:this.shape_392,p:{x:102.275}},{t:this.shape_419,p:{x:109.125}},{t:this.shape_409,p:{x:119.55}},{t:this.shape_672},{t:this.shape_405,p:{x:133.1}},{t:this.shape_412,p:{x:139.225}},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_411,p:{x:176.425}},{t:this.shape_667},{t:this.shape_387,p:{x:190.35}},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_399,p:{x:227.575}},{t:this.shape_662},{t:this.shape_155,p:{x:243.375,y:284.875}},{t:this.shape_661},{t:this.shape_396,p:{x:254.775}},{t:this.shape_660},{t:this.shape_406,p:{x:276.225}},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_390,p:{x:318.175}},{t:this.shape_93,p:{x:325.05,y:284.725}},{t:this.shape_654},{t:this.shape_148,p:{x:340.3,y:283.475}},{t:this.shape_653},{t:this.shape_652},{t:this.shape_146,p:{x:355.25,y:283.475}},{t:this.shape_402,p:{x:361.075}},{t:this.shape_651},{t:this.shape_397,p:{x:375.2}},{t:this.shape_650},{t:this.shape_401,p:{x:390.675}},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_413,p:{x:428.7}},{t:this.shape_119,p:{x:434.25,y:283.475}},{t:this.shape_645},{t:this.shape_120,p:{x:447.375,y:285.875}},{t:this.shape_644},{t:this.shape_386,p:{x:465.025}},{t:this.shape_643},{t:this.shape_642},{t:this.shape_391,p:{x:489.65}},{t:this.shape_641},{t:this.shape_389,p:{x:503.55}},{t:this.shape_388,p:{x:509.675}},{t:this.shape_139,p:{x:44.1,y:301.975}},{t:this.shape_112,p:{x:50.85,y:300.575}},{t:this.shape_640},{t:this.shape_639},{t:this.shape_420,p:{x:72.3,y:301}},{t:this.shape_638},{t:this.shape_382,p:{x:86.325}},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_90,p:{x:169.375,y:301.975}},{t:this.shape_375,p:{x:176.525}},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_373,p:{x:220.775}},{t:this.shape_624},{t:this.shape_623},{t:this.shape_378,p:{x:239.275}},{t:this.shape_622},{t:this.shape_621},{t:this.shape_113,p:{x:259.8,y:300.525}},{t:this.shape_115,p:{x:266.9,y:300.575}},{t:this.shape_145,p:{x:272.875,y:301.825}},{t:this.shape_620},{t:this.shape_370,p:{x:285.175}},{t:this.shape_59,p:{x:292,y:301.825}},{t:this.shape_619},{t:this.shape_618},{t:this.shape_404,p:{x:315,y:301}},{t:this.shape_617},{t:this.shape_369,p:{x:325.125}},{t:this.shape_132,p:{x:332.625,y:301.825}},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_365,p:{x:374.675}},{t:this.shape_122,p:{x:382.225,y:301.825}},{t:this.shape_416,p:{x:388.6,y:301}},{t:this.shape_611},{t:this.shape_109,p:{x:404.475,y:301.825}},{t:this.shape_610},{t:this.shape_160,p:{x:420.775,y:301.825}},{t:this.shape_364,p:{x:430.075}},{t:this.shape_609},{t:this.shape_608},{t:this.shape_374,p:{x:451.5}},{t:this.shape_607},{t:this.shape_153,p:{x:466.225,y:300.525}},{t:this.shape_86,p:{x:471.75,y:300.575}},{t:this.shape_367,p:{x:477.575}},{t:this.shape_606},{t:this.shape_605},{t:this.shape_84,p:{x:500.625,y:301.825}},{t:this.shape_149,p:{x:508.125,y:300.525}},{t:this.shape_65,p:{x:31.875,y:319.075}},{t:this.shape_76,p:{x:37.4,y:317.675}},{t:this.shape_604},{t:this.shape_603},{t:this.shape_398,p:{x:56.25,y:319}},{t:this.shape_127,p:{x:61.95,y:317.625}},{t:this.shape_103,p:{x:72.925,y:318.925}},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_88,p:{x:101.15,y:318.925}},{t:this.shape_64,p:{x:105.25,y:317.675}},{t:this.shape_599},{t:this.shape_80,p:{x:116.6,y:317.625}},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_114,p:{x:191.775,y:317.625}},{t:this.shape_589},{t:this.shape_75,p:{x:206.875,y:318.925}},{t:this.shape_379,p:{x:213.25,y:318.1}},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_131,p:{x:287.025,y:319}},{t:this.shape_579},{t:this.shape_578},{t:this.shape_73,p:{x:310.175,y:318.925}},{t:this.shape_577},{t:this.shape_56,p:{x:328.625,y:318.925}},{t:this.shape_427,p:{x:335.9,y:320.325}},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_158,p:{x:365.4,y:317.625}},{t:this.shape_573},{t:this.shape_572},{t:this.shape_383,p:{x:387.525,y:319.075}},{t:this.shape_414,p:{x:393.9,y:318.1}},{t:this.shape_571},{t:this.shape_99,p:{x:403.75,y:317.675}},{t:this.shape_70,p:{x:409.575,y:317.625}},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_377,p:{x:449.8,y:317.55}},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_408,p:{x:488,y:318.1}},{t:this.shape_562},{t:this.shape_561},{t:this.shape_54,p:{x:505.05,y:317.625}},{t:this.shape_68,p:{x:508.25,y:317.675}},{t:this.shape_560},{t:this.shape_559}]},1).to({state:[]},1).wait(14));

	// Layer_6
	this.try_again = new lib.try_again_button();
	this.try_again.name = "try_again";
	this.try_again.setTransform(487.45,376,1,1,0,0,0,57.5,13.6);
	new cjs.ButtonHelper(this.try_again, 0, 1, 2, false, new lib.try_again_button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.try_again).wait(20));

	// Layer_2
	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#F2F2F2").s().p("AgYBrQgHgHAAgLQAAgKAHgHQAHgHALAAQAIAAAIAHQAHAHAAAKQAAALgHAHQgIAHgIAAQgLAAgHgHgAgWAsIgEgIQgCgGAAgFQAAgKACgJQAEgHAEgIQAGgIAOgRQAPgQAAgLQAAgVgbAAQgNAAgPANIgQgdQAUgPAgAAQAXAAARANQAQAOAAAWQAAAQgFALQgGAKgQAPQgPANgFAJQgEAKAAALIACANg");
	this.shape_716.setTransform(497.6,58.975);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#F2F2F2").s().p("Ag5A+QgVgWAAgmQAAgmAXgXQAYgYAgAAQAjAAAWAVQAVAVAAAgQAAAIgDANIhzAAQABATAMALQANALATgBQAaAAAOgNIAOAdQgUAQgnAAQgkAAgWgWgAApgQQgEgkgjABQgggBgIAkIBPAAIAAAAg");
	this.shape_717.setTransform(481.725,62);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#F2F2F2").s().p("AgeBRQgKgCgPgJIANgdQARANAVAAQAWAAAAgQQAAgJgHgGQgHgGgSgIQgqgQAAggQAAgVAQgMQAQgLAYAAQAZAAAXALIgLAeQgNgLgWAAQgTAAAAAPQAAAHAHAFQAGAFAVAJQAVAHAKALQAJANAAAQQAAAXgRANQgRANgbAAQgQAAgKgDg");
	this.shape_718.setTransform(466.125,62);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#F2F2F2").s().p("Ag2BTIAAihIAmAAIAAAOQAQgRAZAAQAUAAAKAFIgQAhQgKgHgMAAQgOAAgJAMQgKAMAAARIAABcg");
	this.shape_719.setTransform(453.775,61.85);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#F2F2F2").s().p("AhGAXIAAhoIAmAAIAABkQAAAgAcAAQALAAALgHQAMgHAEgIIAAhuIAlAAIAAChIglAAIAAgOQgJAHgOAFQgNAEgLAAQg5AAAAg7g");
	this.shape_720.setTransform(437.1,62.15);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#F2F2F2").s().p("Ag4A9QgVgXAAgmQAAgkAWgYQAVgXAiAAQAlAAAUAXQAVAVAAAnQAAAmgVAXQgVAXgkAAQgkAAgUgXgAgbgnQgLAOAAAZQAAA1AmAAQASAAAKgOQAKgOAAgZQAAg1gmAAQgRAAgKAOg");
	this.shape_721.setTransform(419.225,62);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#F2F2F2").s().p("AgvA+QgVgWAAgmQAAgmAXgXQAYgYAoAAQAcAAAVAQIgQAcQgOgMgWAAQgVAAgMAOQgNAOABAZQAAAyAvAAQAWABAPgOIAOAdQgQALgMACQgNADgQAAQglAAgWgWg");
	this.shape_722.setTransform(402.55,62);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#F2F2F2").s().p("Ag9BPQArAAAAgWQAAgOgMgeIgyh9IAnAAIArBwIAohwIAnAAIhHC7QgGAQgSALQgVALgaAAg");
	this.shape_723.setTransform(377,65.175);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#F2F2F2").s().p("ABLBTIAAhlQAAgggdAAQgIAAgIAFQgIAFgDAHIAAB0IglAAIAAhrQAAgMgHgHQgIgHgNAAQgHAAgJAGQgIAFgEAGIAAB0IgmAAIAAihIAaAAIAIANQAQgQAZAAQAgAAAPARQAHgIANgFQANgFANABQAbAAAPAPQAPAPAAAbIAABrg");
	this.shape_724.setTransform(355.525,61.85);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#F2F2F2").s().p("AAhBTIAAhdQAAgVgHgKQgJgJgRAAQgIAAgJAFQgKAEgFAIIAAB0IgmAAIAAihIAbAAIAHAPQAPgTAeABQAdAAARARQAQARAAAfIAABjg");
	this.shape_725.setTransform(323.75,61.85);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#F2F2F2").s().p("AgKBxIAAiDIgUAAIAAgeIA6AAIAAChgAgFhKQgHgHAAgJQAAgIAHgHQAFgGAJAAQAJAAAGAGQAHAHAAAIQAAAJgHAHQgGAGgJABQgJgBgFgGg");
	this.shape_726.setTransform(309.5,58.85);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#F2F2F2").s().p("AgbBSIAAi9IAlgJIAAC1QAAAeASAGQgJAQgUAAQgaAAAAgjg");
	this.shape_727.setTransform(292.475,58.675);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#F2F2F2").s().p("Ag4A9QgVgXAAgmQAAgkAWgYQAVgXAiAAQAlAAAUAXQAVAVAAAnQAAAmgVAXQgVAXgkAAQgkAAgUgXgAgbgnQgLAOAAAZQAAA1AmAAQASAAAKgOQAKgOAAgZQAAg1gmAAQgRAAgKAOg");
	this.shape_728.setTransform(278.275,62);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#F2F2F2").s().p("Ag4A9QgVgXAAgmQAAgkAWgYQAVgXAiAAQAlAAAUAXQAVAVAAAnQAAAmgVAXQgVAXgkAAQgkAAgUgXgAgbgnQgLAOAAAZQAAA1AmAAQASAAAKgOQAKgOAAgZQAAg1gmAAQgRAAgKAOg");
	this.shape_729.setTransform(260.775,62);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#F2F2F2").s().p("AgVBcQgNgNAAgZIAAhRIgSAAIAAgfIASAAIAAghIAlgOIAAAvIAtAAIAAAfIgtAAIAABGQAAAQAGAIQAFAHAOAAQANAAAMgIIAAAjQgNAFgYAAQgYAAgNgOg");
	this.shape_730.setTransform(245.825,59.8);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#F2F2F2").s().p("AhKBvIAAgNIBcitIhaAAIAAgjICPAAIAAANIhbCtIBfAAIAAAjg");
	this.shape_731.setTransform(221.775,59);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#F2F2F2").s().p("AgTBvIAAhbIhKiCIApAAIA0BfIA0hfIAqAAIhKCCIAABbg");
	this.shape_732.setTransform(203.625,59);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#F2F2F2").s().p("AAxBvIgzhQIgwBQIgpAAIBChyIg9hrIAoAAIAtBLIAxhLIApAAIhHBsIBKBxg");
	this.shape_733.setTransform(184.825,59);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#F2F2F2").s().p("Ag5A+QgVgWAAgmQAAgmAXgXQAYgYAgAAQAjAAAWAVQAVAVAAAgQAAAIgDANIhzAAQABATAMALQANALATgBQAaAAAOgNIAOAdQgUAQgnAAQgkAAgWgWgAApgQQgEgkgjABQgggBgIAkIBPAAIAAAAg");
	this.shape_734.setTransform(157.325,62);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#F2F2F2").s().p("AgeBRQgKgCgPgJIANgdQARANAVAAQAWAAAAgQQAAgJgHgGQgHgGgSgIQgqgQAAggQAAgVAQgMQAQgLAYAAQAZAAAXALIgLAeQgNgLgWAAQgTAAAAAPQAAAHAHAFQAGAFAVAJQAVAHAKALQAJANAAAQQAAAXgRANQgRANgbAAQgQAAgKgDg");
	this.shape_735.setTransform(141.725,62);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#F2F2F2").s().p("AhGAXIAAhoIAmAAIAABkQAAAgAcAAQAMAAAKgHQAMgHADgIIAAhuIAmAAIAAChIgmAAIAAgOQgHAHgOAFQgOAEgLAAQg5AAAAg7g");
	this.shape_736.setTransform(125.9,62.15);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#F2F2F2").s().p("AgTBvIAAjdIAnAAIAADdg");
	this.shape_737.setTransform(103.175,59);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#F2F2F2").s().p("AAhBTIAAhdQAAgVgHgKQgJgJgRAAQgIAAgJAFQgKAEgFAIIAAB0IgmAAIAAihIAbAAIAHAPQAQgTAdABQAdAAARARQAQARAAAfIAABjg");
	this.shape_738.setTransform(80.4,61.85);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#F2F2F2").s().p("AAkBOQgHgGgCgHQgFAJgNAEQgMAGgOAAQgaAAgPgNQgPgNAAgYQAAgcAVgQQAVgPAmAAQAHAAAJACQAAgcgjAAQgWAAgOAGIgIgdQATgJAbAAQAkAAASARQARARAAAuIAAAjQAAAfANAJQgFAIgFACQgGACgIAAQgIAAgGgGgAgjAgQAAAWAZAAQAhAAAAgiIAAgPIgOgCQgsAAAAAdg");
	this.shape_739.setTransform(63.125,62);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#F2F2F2").s().p("Ag5BUQgagfAAg0QAAgxAcghQAdghArAAQAnAAAWAQIgQAgQgNgNgdAAQgbAAgSAXQgRAYAAAiQAAAkAQAVQARAVAaAAQAfAAASgXIASAgQgYAaguAAQguAAgZgfg");
	this.shape_740.setTransform(45.425,59.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716}]}).to({state:[{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716}]},19).wait(1));

	// Layer_1
	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#808485").s().p("Egq9AWbMAAAgs1MBV7AAAMAAAAs1g");
	this.shape_741.setTransform(274.975,256.5);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#022D50").s().p("Egq9AI6IAAxzMBV7AAAIAARzg");
	this.shape_742.setTransform(274.975,56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_742},{t:this.shape_741}]}).to({state:[{t:this.shape_742},{t:this.shape_741}]},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(275,199,275,201);
// library properties:
lib.properties = {
	id: '671BC90B9775445589C49B9CAC6D9A6A',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['671BC90B9775445589C49B9CAC6D9A6A'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;