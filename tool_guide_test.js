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
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.yes_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(1,25,44,0.886)").s().p("Ai6DDIBDhhQA7A2BBAAQA3AAAAgqQAAgTglgTIhQgjQh2g2AAhcQAAhHA2gtQA0gsBOAAQBxAAA3A7Ig2BpQg1gug+AAQgVAAgQAJQgSALAAAVQAAAUAlASQAVALA7AXQB1AzAABeQAABFgvAtQg0AxhVAAQh5AAhEhLg");
	this.shape.setTransform(194.575,150.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(1,25,44,0.886)").s().p("AinEFIAAoJIFGAAIAABuIjHAAIAABeICeAAIAABtIieAAIAABiIDRAAIAABug");
	this.shape_1.setTransform(153.7,150.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(1,25,44,0.886)").s().p("Ag/EFIAAjWIiskzICRAAIA7B+QARAkAOAnIABAAQAPgnAQgkIA7h+ICRAAIisEzIAADWg");
	this.shape_2.setTransform(107.425,150.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F2F2F2").s().p("AxHRIQnGnGAAqCQAAqBHGnGQHGnGKBAAQKCAAHGHGQHGHGAAKBQAAKCnGHGQnGHGqCAAQqBAAnGnGg");
	this.shape_3.setTransform(155,155);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C6A76A").s().p("AxHRIQnGnGAAqCQAAqBHGnGQHGnGKBAAQKCAAHGHGQHGHGAAKBQAAKCnGHGQnGHGqCAAQqBAAnGnGg");
	this.shape_4.setTransform(155,155);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(1,25,44,0.886)").s().p("Aj1EBIBYiAQBOBHBVAAQBJAAAAg3QAAgZgxgZIhpguQibhHAAh5QAAheBHg7QBEg6BnAAQCUAABJBOIhHCJQhFg8hTAAQgcAAgUAMQgXAPAAAbQAAAbAwAYQAcAOBNAeQCaBDAAB9QAABZg+A8QhEBAhvAAQihAAhZhig");
	this.shape_5.setTransform(208.575,150.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(1,25,44,0.886)").s().p("AjdFXIAAqtIGuAAIAACPIkGAAIAAB9IDRAAIAACPIjRAAIAACCIETAAIAACQg");
	this.shape_6.setTransform(154.825,150.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(1,25,44,0.886)").s().p("AhTFXIAAkZIjjmUIC/AAIBOClQAWAvATA0IABAAQATg0AWgvIBNilIC/AAIjiGUIAAEZg");
	this.shape_7.setTransform(94,150.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_4},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,310,310);


(lib.will_students_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00192C").s().p("Ag7EHIAAhHIBHAAIAABHgAg6B6IAAgjQABglATgfQAMgUAdgbQAigeAJgMQATgZAAgbQABgggYgUQgYgVgjAAQgtAAgmAfIgngzQAwgvBQAAQA+AAAsAlQAtAlAAA8QAAAogUAhQgNAVggAdQgiAegKAMQgUAaAAAcIAAAfg");
	this.shape.setTransform(975.1,133.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00192C").s().p("Ag8CbIAAmdIBGAAIAAGRQAAA1AnAAIAMgBIAAA/QgKABgNAAQhiAAAAhog");
	this.shape_1.setTransform(950.675,134.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00192C").s().p("AiMCKQg6g4AAhSQAAhTA6g3QA5g2BTAAQBTAAA6A2QA6A3AABTQAABSg6A4Qg6A3hTAAQhTAAg5g3gAhYheQgmAmAAA4QAAA4AmAmQAkAmA0AAQA1AAAlgmQAlgmAAg4QAAg4glgmQglgmg1ABQg0gBgkAmg");
	this.shape_2.setTransform(916.675,141.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00192C").s().p("AiMCKQg6g4AAhSQAAhTA6g3QA5g2BTAAQBTAAA6A2QA6A3AABTQAABSg6A4Qg6A3hTAAQhTAAg5g3gAhYheQgmAmAAA4QAAA4AmAmQAkAmA0AAQA1AAAlgmQAlgmAAg4QAAg4glgmQglgmg1ABQg0gBgkAmg");
	this.shape_3.setTransform(871.125,141.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00192C").s().p("AgGDWQg0giAAhRIAAisIgxAAIAAg5IAzAAIAAhqIBDAAIAABqIBZAAIAAA5IhZAAIAACkQAABTBPAAQAKAAAIgBIAAA/QgLABgPAAQg1AAgjgXg");
	this.shape_4.setTransform(835.25,136.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#00192C").s().p("AiICLIAigyQAqArA/AAQAZAAASgLQATgOAAgVQAAgWgegRIhBgcQgsgTgUgTQgegcAAgoQgBgxAogdQAlgbA4AAQBSAAAmApIgdA0Qghggg7AAQgYgBgQALQgTANAAAWQAAAVAeARIA/AcQAtASAVATQAeAcAAApQAAAvgkAeQgmAeg8AAQhZAAgyg2g");
	this.shape_5.setTransform(787.05,141.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#00192C").s().p("AgiECIAAlxIBGAAIAAFxgAgii4IAAhJIBGAAIAABJg");
	this.shape_6.setTransform(761.7,134.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#00192C").s().p("ABgECIAAjdQAAgrgNgVQgQgcgpAAQgoAAggAaQggAZgMAoQgGATAAAeIAACtIhGAAIAAoDIBGAAIAAC+IgBAeIABAAQAPggAggXQAogbAxAAQB/AAAACMIAADtg");
	this.shape_7.setTransform(730.925,134.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#00192C").s().p("AgGDWQg0giAAhRIAAisIgwAAIAAg5IAyAAIAAhqIBDAAIAABqIBZAAIAAA5IhZAAIAACkQAABTBQAAQAJAAAIgBIAAA/QgLABgPAAQg1AAgjgXg");
	this.shape_8.setTransform(695.55,136.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#00192C").s().p("AiLDrIAYg4QAuAZA3AAQAzAAAfgXQAigbAAg2IAAgbIABgXIgCAAQgiA6hKAAQhLAAgvg3Qgrg0AAhRQAAhSAqgyQAsg1BLAAQBZAAAaA3IABAAIAAgMIAAgiIBEAAIAAFhQAABVg6AtQgyAnhNAAQhCAAg9gfgAhLirQgaAhAAA4QAAA6AdAjQAdAkAxAAQBhAAAAh/QAAh8hnAAQgvAAgcAhg");
	this.shape_9.setTransform(641,148.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#00192C").s().p("ABgC9IAAjcQAAgsgNgVQgQgbgpAAQgpAAgfAZQggAZgMAoQgGAUAAAdIAACtIhGAAIAAlxIBEAAIAAAyQAAAOgBANIABAAQAPggAegXQAogeA1AAQB/AAAACNIAADsg");
	this.shape_10.setTransform(598.825,141.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#00192C").s().p("AgiECIAAlxIBFAAIAAFxgAgii4IAAhJIBFAAIAABJg");
	this.shape_11.setTransform(567.45,134.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#00192C").s().p("AiICLIAjgyQApArA/AAQAZAAARgLQAUgOgBgVQAAgWgdgRIhAgcQgsgTgVgTQgfgcAAgoQAAgxAogdQAlgbA4AAQBSAAAlApIgcA0Qghggg6AAQgZgBgQALQgTANAAAWQAAAVAeARIBAAcQAsASAVATQAeAcAAApQAAAvglAeQglAeg8AAQhaAAgxg2g");
	this.shape_12.setTransform(541.95,141.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#00192C").s().p("AiICLIAigyQAqArA/AAQAZAAASgLQASgOABgVQgBgWgdgRIhBgcQgrgTgWgTQgdgcAAgoQAAgxAngdQAlgbA4AAQBRAAAnApIgdA0Qghggg6AAQgZgBgQALQgTANAAAWQAAAVAdARIBAAcQAtASAVATQAeAcAAApQAAAvglAeQglAeg8AAQhZAAgyg2g");
	this.shape_13.setTransform(509.25,141.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00192C").s().p("Ah1CKQg2g3AAhTQAAhWA0g2QA0g1BPABQBMgBArAzQApAwAABKQAAAKgCAUIkMAAQACA6AmAiQAjAeAzAAQA/AAAugrIAdAzQg2A1hZAAQhVAAg3g3gABkgqQgCgugZgZQgZgXglgBQgoABgeAYQgeAZgHAtIDEAAIAAAAg");
	this.shape_14.setTransform(472.725,141.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#00192C").s().p("Ah0CKQg4g3AAhTQAAhSA4g3QA4g3BVAAQBdgBAuA3IgiAxQgngqg/AAQg2AAglAlQgkAlAAA5QAAA4AkAmQAlAmA4AAQBFAAAtgyIAdA0QgzA7hhAAQhVAAg4g3g");
	this.shape_15.setTransform(432.775,141.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#00192C").s().p("Ah0CKQg4g3AAhTQAAhSA4g3QA4g3BVAAQBdgBAuA3IgiAxQgngqg/AAQg2AAglAlQgkAlAAA5QAAA4AkAmQAlAmA4AAQBFAAAtgyIAdA0QgzA7hhAAQhVAAg4g3g");
	this.shape_16.setTransform(392.875,141.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#00192C").s().p("AhzClQgnggAAg0QAAh+DeAAIAQAAIAAgHQAAhRhRAAQg4AAguAkIgdg0QA1gsBUABQBGgBAmAlQAmAmAABGIAADoIhCAAIAAgjQAAgQACgMIgCAAQgeBIhXAAQgzAAgkgcgAhSBNQAAAYARARQATASAhABQAqAAAdgnQAbgjAAgsIAAgMIgTAAQiUAAAABGg");
	this.shape_17.setTransform(352.225,141.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00192C").s().p("Ah1CKQg2g3AAhTQAAhWA0g2QA0g1BPABQBMgBArAzQApAwAABKQAAAKgCAUIkMAAQACA6AmAiQAjAeAzAAQA/AAAugrIAdAzQg2A1hZAAQhVAAg3g3gABkgqQgCgugZgZQgZgXglgBQgoABgeAYQgeAZgHAtIDEAAIAAAAg");
	this.shape_18.setTransform(295.175,141.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#00192C").s().p("AhsDGIgBAAQABAMAAAQIAAAbIhDAAIAAoCIBHAAIAACoIgBAgIABAAQAgg/BWAAQBJAAAtA2QArA1AABWQABBXgwA1QgvA1hJAAQhSAAgihAgAhKgfQggAjAABCQAAA2AaAkQAdAqAxAAQAtAAAegjQAfglAAg9QAAg8gdgjQgdgkguAAQgtAAgdAfg");
	this.shape_19.setTransform(254.25,134.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#00192C").s().p("AiICLIAigyQAqArA/AAQAZAAASgLQASgOABgVQgBgWgdgRIhBgcQgrgTgWgTQgdgcAAgoQAAgxAngdQAlgbA4AAQBRAAAnApIgdA0Qghggg6AAQgZgBgQALQgTANAAAWQAAAVAdARIBAAcQAtASAVATQAeAcAAApQAAAvgkAeQgmAeg8AAQhZAAgyg2g");
	this.shape_20.setTransform(195.95,141.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00192C").s().p("AhlC7IAAlxIBFAAIAABBQAAAPgCANIACAAQANgqAdgbQAggcAqAAQAJAAAJACIAABGQgKgCgKAAQgjAAgcAWQgcAYgMAoQgJAcAAAmIAACXg");
	this.shape_21.setTransform(168.075,141.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#00192C").s().p("Ah1CKQg2g3AAhTQAAhWA0g2QA0g1BPABQBMgBArAzQApAwAABKQAAAKgCAUIkMAAQACA6AmAiQAjAeAzAAQA/AAAugrIAdAzQg2A1hZAAQhVAAg3g3gABkgqQgCgugZgZQgZgXglgBQgoABgeAYQgeAZgHAtIDEAAIAAAAg");
	this.shape_22.setTransform(132.075,141.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00192C").s().p("AiICLIAigyQAqArA/AAQAZAAASgLQATgOAAgVQAAgWgegRIhBgcQgsgTgUgTQgegcAAgoQAAgxAngdQAlgbA4AAQBSAAAmApIgdA0Qghggg7AAQgYgBgQALQgTANAAAWQAAAVAeARIA/AcQAtASAVATQAeAcAAApQAAAvgkAeQgmAeg8AAQhaAAgxg2g");
	this.shape_23.setTransform(95.4,141.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00192C").s().p("AikAvIAAjrIBGAAIAADbQAAAsANAVQAQAbApAAQA1AAAigqQAfgoAAg4IAAitIBHAAIAAFwIhEAAIAAgxQAAgPABgMIgBAAQgOAgghAYQgnAdgxAAQh+AAAAiOg");
	this.shape_24.setTransform(57.075,142.175);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00192C").s().p("Ag8CbIAAmdIBGAAIAAGRQAAA1AnAAIAMgBIAAA/QgKABgNAAQhiAAAAhog");
	this.shape_25.setTransform(1016.975,44.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00192C").s().p("AhzCkQgngfAAg0QAAh+DeAAIAQAAIAAgHQAAhRhRAAQg4AAguAkIgdg0QA1grBUgBQBGAAAmAmQAmAlAABGIAADoIhCAAIAAgiQAAgRACgNIgCAAQgeBKhXgBQgzAAgkgdgAhSBNQAAAYARARQATASAhAAQAqAAAdgmQAbgjAAgsIAAgMIgTAAQiUAAAABGg");
	this.shape_26.setTransform(985.275,52.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#00192C").s().p("ABgC9IAAjcQAAgsgNgVQgQgbgpgBQgpABgfAZQggAZgMAoQgGAUAAAdIAACtIhGAAIAAlwIBEAAIAAAwQAAAPgBAMIABAAQAPgfAegXQAogeA1AAQB/AAAACOIAADrg");
	this.shape_27.setTransform(945.525,51.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#00192C").s().p("AhlC7IAAlwIBFAAIAABAQAAAPgCAMIACAAQANgpAdgbQAggcAqAAQAJAAAJACIAABFQgKgCgKAAQgjAAgcAYQgcAXgMApQgJAcAAAlIAACXg");
	this.shape_28.setTransform(911.625,51.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#00192C").s().p("Ah1CJQg2g2AAhTQAAhWA0g2QA0g1BPAAQBMAAArAzQApAvAABMQAAAJgCAUIkMAAQACA7AmAgQAjAfAzAAQA/AAAugrIAdA0Qg2A0hZAAQhVAAg3g4gABkgrQgCgtgZgZQgZgXglAAQgoAAgeAYQgeAZgHAsIDEAAIAAAAg");
	this.shape_29.setTransform(875.625,52.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#00192C").s().p("AgFDWQg1giAAhRIAAirIgxAAIAAg6IAzAAIAAhqIBEAAIAABqIBZAAIAAA6IhZAAIAACjQAABTBOAAQALAAAGgCIAAA/QgKACgOAAQg2AAgigXg");
	this.shape_30.setTransform(842.3,47.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#00192C").s().p("ABZC5IhNh8IgLgUIgBAAIgLAUIhNB8IhQAAIB9i9Ih3i0IBRAAIBFBxIAMAWIABAAIAMgWIBFhxIBRAAIh3C0IB9C9g");
	this.shape_31.setTransform(810.775,52.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#00192C").s().p("Ah1CJQg2g2AAhTQAAhWA0g2QA0g1BPAAQBMAAArAzQApAvAABMQAAAJgCAUIkMAAQACA7AmAgQAjAfAzAAQA/AAAugrIAdA0Qg2A0hZAAQhVAAg3g4gABkgrQgCgtgZgZQgZgXglAAQgoAAgeAYQgeAZgHAsIDEAAIAAAAg");
	this.shape_32.setTransform(771.975,52.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00192C").s().p("AhlC7IAAlwIBFAAIAABAQAAAPgCAMIACAAQANgpAdgbQAggcAqAAQAJAAAJACIAABFQgKgCgKAAQgjAAgcAYQgcAXgMApQgJAcAAAlIAACXg");
	this.shape_33.setTransform(721.375,51.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#00192C").s().p("Ah1CJQg2g2AAhTQAAhWA0g2QA0g1BPAAQBMAAArAzQApAvAABMQAAAJgCAUIkMAAQACA7AmAgQAjAfAzAAQA/AAAugrIAdA0Qg2A0hZAAQhVAAg3g4gABkgrQgCgtgZgZQgZgXglAAQgoAAgeAYQgeAZgHAsIDEAAIAAAAg");
	this.shape_34.setTransform(685.375,52.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#00192C").s().p("ABgECIAAjdQAAgrgNgVQgQgcgpAAQgoAAggAaQggAZgMAoQgGATAAAeIAACtIhGAAIAAoDIBGAAIAAC+IgBAeIABAAQAPggAggXQAogbAxAAQB/AAAACMIAADtg");
	this.shape_35.setTransform(643.425,44.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00192C").s().p("AgFDWQg1giAAhRIAAirIgwAAIAAg6IAyAAIAAhqIBEAAIAABqIBZAAIAAA6IhZAAIAACjQAABTBPAAQAJAAAIgCIAAA/QgLACgOAAQg2AAgigXg");
	this.shape_36.setTransform(608.05,47.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#00192C").s().p("AiMCKQg6g3AAhTQAAhTA6g3QA5g3BTAAQBTAAA6A3QA6A3AABTQAABTg6A3Qg6A3hTAAQhTAAg5g3gAhYhfQgmAmAAA5QAAA4AmAmQAkAmA0AAQA1AAAlgmQAlglAAg5QAAg5glgmQglgkg1gBQg0ABgkAkg");
	this.shape_37.setTransform(572.275,52.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#00192C").s().p("AhlC7IAAlwIBFAAIAABAQAAAPgCAMIACAAQANgpAdgbQAggcAqAAQAJAAAJACIAABFQgKgCgKAAQgjAAgcAYQgcAXgMApQgJAcAAAlIAACXg");
	this.shape_38.setTransform(519.125,51.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#00192C").s().p("AiMCKQg6g3AAhTQAAhTA6g3QA5g3BTAAQBTAAA6A3QA6A3AABTQAABTg6A3Qg6A3hTAAQhTAAg5g3gAhYhfQgmAmAAA5QAAA4AmAmQAkAmA0AAQA1AAAlgmQAlglAAg5QAAg5glgmQglgkg1gBQg0ABgkAkg");
	this.shape_39.setTransform(480.625,52.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#00192C").s().p("AiICLIAigyQAqArA/AAQAZAAASgMQASgNABgVQgBgWgdgRIhBgcQgrgTgVgTQgegcAAgpQAAgxAngcQAlgcA4AAQBRAAAnApIgdA2Qghgig7AAQgYABgQAKQgTAMAAAXQAAAVAdARIBAAcQAtASAVATQAeAcAAApQAAAugkAfQgmAeg8AAQhZAAgyg2g");
	this.shape_40.setTransform(422.65,52.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#00192C").s().p("AgFDWQg1giAAhRIAAirIgwAAIAAg6IAyAAIAAhqIBEAAIAABqIBZAAIAAA6IhZAAIAACjQAABTBPAAQAJAAAHgCIAAA/QgKACgOAAQg2AAgigXg");
	this.shape_41.setTransform(393.3,47.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#00192C").s().p("ABgC9IAAjcQAAgsgNgVQgQgbgpgBQgpABgfAZQggAZgMAoQgGAUAAAdIAACtIhGAAIAAlwIBEAAIAAAwQAAAPgBAMIABAAQAPgfAegXQAogeA1AAQB/AAAACOIAADrg");
	this.shape_42.setTransform(358.575,51.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#00192C").s().p("Ah1CJQg2g2AAhTQAAhWA0g2QA0g1BPAAQBMAAArAzQApAvAABMQAAAJgCAUIkMAAQACA7AmAgQAjAfAzAAQA/AAAugrIAdA0Qg2A0hZAAQhVAAg3g4gABkgrQgCgtgZgZQgZgXglAAQgoAAgeAYQgeAZgHAsIDEAAIAAAAg");
	this.shape_43.setTransform(316.025,52.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#00192C").s().p("AiDDQQgsg1AAhWQAAhXAvg1QAug1BKAAQBVAAAcA7IACAAQgCgMAAgNIAAirIBHAAIAAICIhDAAIAAgjIABgZIgCAAQgeBFhaAAQhKAAgtg2gAhHgcQggAkAAA9QAAA7AeAlQAdAkAtAAQAtAAAdggQAggjAAhCQAAg2gagkQgcgpgyAAQgtAAgdAjg");
	this.shape_44.setTransform(272.675,45.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#00192C").s().p("AikAvIAAjrIBGAAIAADbQAAAsANAVQAQAbApAAQA1AAAigqQAfgoAAg4IAAitIBHAAIAAFwIhEAAIAAgxQAAgPABgMIgBAAQgOAgghAYQgnAdgxAAQh+AAAAiOg");
	this.shape_45.setTransform(229.875,52.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#00192C").s().p("AgFDWQg1giAAhRIAAirIgxAAIAAg6IAzAAIAAhqIBEAAIAABqIBZAAIAAA6IhZAAIAACjQAABTBOAAQALAAAGgCIAAA/QgKACgOAAQg2AAgigXg");
	this.shape_46.setTransform(195.2,47.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#00192C").s().p("AiICLIAjgyQApArA/AAQAZAAARgMQAUgNgBgVQAAgWgdgRIhAgcQgsgTgVgTQgfgcAAgpQAAgxAogcQAlgcA4AAQBSAAAlApIgcA2Qghgig6AAQgZABgQAKQgTAMAAAXQAAAVAeARIBAAcQAsASAVATQAeAcAAApQAAAuglAfQglAeg8AAQhaAAgxg2g");
	this.shape_47.setTransform(165.75,52.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#00192C").s().p("Ag8CbIAAmdIBGAAIAAGRQAAA1AnAAIAMgBIAAA/QgKABgNAAQhiAAAAhog");
	this.shape_48.setTransform(122.675,44.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#00192C").s().p("Ag8CbIAAmdIBGAAIAAGRQAAA1AnAAIAMgBIAAA/QgKABgNAAQhiAAAAhog");
	this.shape_49.setTransform(103.375,44.975);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#00192C").s().p("AgiECIAAlxIBFAAIAAFxgAgji4IAAhJIBGAAIAABJg");
	this.shape_50.setTransform(83.05,44.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#00192C").s().p("ABoECIhalOQgIgggGgpIgBAAQgHApgJAgIhZFOIhUAAIiDoDIBKAAIBbF6QAHAbADAbIABAAQAEgaAHgcIBll6IBAAAIBkF6QAIAcADAaIACAAQACgbAHgbIBfl6IBKAAIiHIDg");
	this.shape_51.setTransform(39.425,44.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.will_students_text, new cjs.Rectangle(0,0,1029.9,181.2), null);


(lib.try_again_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(242,242,242,0.886)").s().p("AA6ClIhaiZQgNgVgPgjIgBAAQADAkABAUIAACZIhRAAIAAlJIBRAAIBaCaQANAVAPAjIABAAQgDgkAAgUIAAiaIBQAAIAAFJg");
	this.shape.setTransform(238.85,28.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(242,242,242,0.886)").s().p("AgnClIAAlJIBPAAIAAFJg");
	this.shape_1.setTransform(213.225,28.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(242,242,242,0.886)").s().p("ABHClIgUhGIhlAAIgUBGIhTAAIBwlJIBTAAIBwFJgAAgAfIgSg/QgGgVgIgjIAAAAQgHAjgGAVIgTA/IBAAAg");
	this.shape_2.setTransform(190.125,28.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(242,242,242,0.886)").s().p("AhrB9QgygwAAhNQAAhIAxgwQAxgxBKAAQBUAAAqAsIgmA8QgigfguABQgwgBgaAdQgXAYAAAoQAAAtAdAcQAaAbAngBQAmAAAdgXIAAgZIgvAAIAAhFIB2AAIAAC6IhDAAIAAgJIAAgPIgBAAQggAdg2AAQhCAAgtgtg");
	this.shape_3.setTransform(156.925,28.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(242,242,242,0.886)").s().p("ABHClIgUhGIhlAAIgUBGIhTAAIBwlJIBTAAIBwFJgAAgAfIgSg/QgGgVgIgjIAAAAQgHAjgGAVIgTA/IBAAAg");
	this.shape_4.setTransform(124.275,28.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(242,242,242,0.886)").s().p("AgoClIAAiHIhsjCIBbAAIAmBPQALAXAIAZIABAAQAJgZAKgXIAlhPIBcAAIhtDCIAACHg");
	this.shape_5.setTransform(83.9,28.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(242,242,242,0.886)").s().p("AArClIg5hwIgmAAIAABwIhQAAIAAlJIByAAQArABAUAHQA9AYAABIQAAAcgMAYQgOAZgXAMIAAABIAMATIBAB0gAg0gOIAjAAQApAAAAgpQAAgUgKgJQgLgKgcAAIgbAAg");
	this.shape_6.setTransform(54.875,28.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(242,242,242,0.886)").s().p("AgnClIAAkDIhkAAIAAhGIEXAAIAABGIhkAAIAAEDg");
	this.shape_7.setTransform(23.55,28.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C6A76A").s().p("AA6ClIhaiZQgNgVgPgjIgBAAQADAkABAUIAACZIhRAAIAAlJIBRAAIBaCaQANAVAPAjIABAAQgDgkAAgUIAAiaIBQAAIAAFJg");
	this.shape_8.setTransform(238.85,28.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C6A76A").s().p("AgnClIAAlJIBPAAIAAFJg");
	this.shape_9.setTransform(213.225,28.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C6A76A").s().p("ABHClIgUhGIhlAAIgUBGIhTAAIBwlJIBTAAIBwFJgAAgAfIgSg/QgGgVgIgjIAAAAQgHAjgGAVIgTA/IBAAAg");
	this.shape_10.setTransform(190.125,28.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C6A76A").s().p("AhrB9QgygwAAhNQAAhIAxgwQAxgxBKAAQBUAAAqAsIgmA8QgigfguABQgwgBgaAdQgXAYAAAoQAAAtAdAcQAaAbAngBQAmAAAdgXIAAgZIgvAAIAAhFIB2AAIAAC6IhDAAIAAgJIAAgPIgBAAQggAdg2AAQhCAAgtgtg");
	this.shape_11.setTransform(156.925,28.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#C6A76A").s().p("ABHClIgUhGIhlAAIgUBGIhTAAIBwlJIBTAAIBwFJgAAgAfIgSg/QgGgVgIgjIAAAAQgHAjgGAVIgTA/IBAAAg");
	this.shape_12.setTransform(124.275,28.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C6A76A").s().p("AgoClIAAiHIhsjCIBbAAIAmBPQALAXAIAZIABAAQAJgZAKgXIAlhPIBcAAIhtDCIAACHg");
	this.shape_13.setTransform(83.9,28.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C6A76A").s().p("AArClIg5hwIgmAAIAABwIhQAAIAAlJIByAAQArABAUAHQA9AYAABIQAAAcgMAYQgOAZgXAMIAAABIAMATIBAB0gAg0gOIAjAAQApAAAAgpQAAgUgKgJQgLgKgcAAIgbAAg");
	this.shape_14.setTransform(54.875,28.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C6A76A").s().p("AgnClIAAkDIhkAAIAAhGIEXAAIAABGIhkAAIAAEDg");
	this.shape_15.setTransform(23.55,28.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C6A76A").s().p("A7hIeIAAw7MA3DAAAIAAQ7g");
	this.shape_16.setTransform(133.75,25.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.5,-28.8,352.5,108.39999999999999);


(lib.no_symbol = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(242,242,242,0.886)").s().p("AjCC/QhOhPAAhyQAAhxBOhNQBNhNB1AAQB2AABNBNQBOBNAABxQAAByhOBPQhNBPh2AAQh1AAhNhPgAhihtQgqArAABAQAABBAqAtQAoAtA6AAQA7AAApgtQApgtAAhBQAAhAgpgrQgpgrg7AAQg6AAgoArg");
	this.shape.setTransform(184.15,150.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(242,242,242,0.886)").s().p("ABcEFIiQjzQgVghgXg3IgCAAQAGA4AAAgIAADzIh/AAIAAoJICBAAICPD0QAVAhAXA3IACAAQgGg4AAggIAAj0IB/AAIAAIJg");
	this.shape_1.setTransform(126.125,150.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00192C").s().p("AxHRIQnGnGAAqCQAAqBHGnGQHGnGKBAAQKCAAHGHGQHGHGAAKBQAAKCnGHGQnGHGqCAAQqBAAnGnGg");
	this.shape_2.setTransform(155,155);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C6A76A").s().p("AxHRIQnGnGAAqCQAAqBHGnGQHGnGKBAAQKCAAHGHGQHGHGAAKBQAAKCnGHGQnGHGqCAAQqBAAnGnGg");
	this.shape_3.setTransform(155,155);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(242,242,242,0.886)").s().p("Aj7D1QhkhkAAiUQAAiRBkhkQBkhjCXAAQCXAABkBjQBlBkgBCRQABCUhlBkQhkBniXAAQiXAAhkhngAh/iNQg2A4AABSQAABUA2A6QA0A6BLAAQBMAAA0g6QA1g6AAhUQAAhSg1g4Qg0g3hMAAQhLAAg0A3g");
	this.shape_4.setTransform(192.3,148.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(242,242,242,0.886)").s().p("AB3FQIi7k5QgagrgehHIgCAAQAIBJAAApIAAE5IilAAIAAqfICnAAIC5E6QAaArAeBGIACAAQgHhIAAgpIAAk6ICkAAIAAKfg");
	this.shape_5.setTransform(117.575,148.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_3},{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,310,310);


(lib.intro_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F2F2F2").s().p("AgyEFIAAg4IA3AAIAAA4gAgvB/IAAghQAAgnATgfQAOgWAegbQAhgfALgPQATgbAAgfQAAgjgagZQgcgYgoAAQgyAAgmAfIgcglQAugpBIAAQA+AAApAkQAqAkAAA5QAAAogUAhQgOAVgfAdQgjAegKAOQgVAcAAAgIAAAfg");
	this.shape.setTransform(980.575,44.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F2F2F2").s().p("AhvCKQg3g2AAhUQAAhWA1g2QAzgzBMAAQBJAAAqAyQAmAvAABIIgBAYIkZAAQACBEAqAoQAnAmA7AAQBDAAAsgsIAXAlQg2AzhSAAQhSAAg2g2gAB1glQgCg3gfgfQgcgbgrAAQgvAAgiAcQgkAfgJA2IDmAAIAAAAg");
	this.shape_1.setTransform(944.275,52.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2F2F2").s().p("AiBCLIAbgjQAoAsBEAAQAgAAAUgPQAVgQAAgbQAAgbgegTQgNgHg3gXQgugSgVgTQgfgbAAgoQAAgvAlgcQAkgaAzAAQBOAAAkAnIgXAmQggghg8AAQgeAAgUANQgWAPAAAdQAAAbAfATQANAHA2AWQAvASAUASQAgAbAAAqQAAAsgjAdQgkAdg3AAQhYAAgug1g");
	this.shape_2.setTransform(907.9,52.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F2F2F2").s().p("AhbC5IAAluIAwAAIAABBIgBAdIABAAQAOgrAdgbQAfgbAqAAQAKAAAJACIAAAxIgSgCQgmAAgdAbQgaAagMAqQgLAhAAAmIAACag");
	this.shape_3.setTransform(881.125,52.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F2F2F2").s().p("Ah/CYQgdgiAAhJIAAjoIAxAAIAADbQAAA0ANAYQATAhAwAAQA7AAAngvQAkgsAAg9IAAiwIAyAAIAAFuIgwAAIAAg3QAAgQABgNIgBAAQgOAighAaQgqAhg2AAQhAAAgdgkg");
	this.shape_4.setTransform(844.225,52.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2F2F2").s().p("AiICJQg5g4AAhSQAAhRA5g3QA4g2BQAAQBRAAA4A2QA5A3AABRQAABSg5A4Qg4A3hRAAQhQAAg4g3gAhkhpQgqAqAAA+QAAA/AqArQApArA7AAQA7AAAqgrQAqgrAAg/QAAg+gqgqQgqgpg7AAQg7AAgpApg");
	this.shape_5.setTransform(800.325,52.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F2F2F2").s().p("AhvCLQg4g2AAhVQAAhTA4g2QA3g2BRAAQBaAAAtA0IgaAmQgpguhCABQg9AAgoAoQgqAqAABAQABBBAqApQApAqA8AAQBKAAArg0IAXAmQgyA6hdAAQhSAAg2g1g");
	this.shape_6.setTransform(757.75,52.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F2F2F2").s().p("AivDuIATgnQAVAQAXAAQArAAAbg7IAXg0IialrIA3AAIBsEKQAIATAEAUIABAAQAGgUAHgTIBqkKIA1AAIizG6QggBNhKAAQgmAAgbgWg");
	this.shape_7.setTransform(699.6,59.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F2F2F2").s().p("ADjC8IAAjdQAAgzgOgZQgTghguAAQgpAAgiAgQgeAdgMArQgGAVAAAgIAACtIgxAAIAAjdQAAgygMgZQgSgigvAAQgrAAgiAiQgfAdgMAtQgGAWABAbIAACtIgyAAIAAluIAxAAIAAA2IgCAdIACAAQAOglAlgbQAngcAqAAQBhAAAQBcIACAAQAPgnAlgaQAmgbAtAAQB6AAAACPIAADog");
	this.shape_8.setTransform(648.4,51.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F2F2F2").s().p("ABuC8IAAjcQAAgzgOgYQgSghgwgBQguAAglAeQglAcgNAvQgFAUgBAcIAACwIgxAAIAAluIAwAAIAAA2IgBAdIABAAQAOghAggZQAsgiA5AAQBBAAAdAlQAcAjAABHIAADog");
	this.shape_9.setTransform(573.75,51.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("AgXEBIAAluIAwAAIAAFugAgZjCIAAg+IAzAAIAAA+g");
	this.shape_10.setTransform(543.375,44.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F2F2F2").s().p("Ai2EBIAAgkIEImBQATgaARgUIAAgCQgNACgYAAIj5AAIAAguIFdAAIAAAkIkIGBQgTAcgSASIAAACQANgCAZAAIEJAAIAAAug");
	this.shape_11.setTransform(493.375,44.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F2F2F2").s().p("AgYEBIAAjdIitkkIA6AAIBsC7QAQAaAPAjIABAAQAPgiAQgbIBti7IA5AAIisEkIAADdg");
	this.shape_12.setTransform(450.975,44.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F2F2F2").s().p("ACKEBIhqiyQgQgagQgeIgBAAQgPAegQAbIhpCxIg7AAICkkLIiVj2IA7AAIBaCYIAgA7IACAAQAOggAQgbIBbiYIA8AAIiXD2IClELg");
	this.shape_13.setTransform(408.425,44.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F2F2F2").s().p("AhvCKQg3g2AAhUQAAhWA1g2QAzgzBMAAQBJAAAqAyQAmAvAABIIgBAYIkZAAQACBEAqAoQAnAmA7AAQBDAAAsgsIAXAlQg2AzhSAAQhSAAg2g2gAB1glQgCg3gfgfQgcgbgrAAQgvAAgiAcQgkAfgJA2IDmAAIAAAAg");
	this.shape_14.setTransform(347.025,52.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F2F2F2").s().p("AiBCLIAbgjQAoAsBEAAQAgAAAUgPQAVgQABgbQAAgbgfgTQgMgHg4gXQgugSgVgTQgfgbAAgoQAAgvAlgcQAkgaAzAAQBOAAAkAnIgXAmQggghg8AAQgeAAgUANQgWAPAAAdQAAAbAfATQANAHA2AWQAvASAUASQAfAbABAqQAAAsgjAdQgjAdg4AAQhYAAgug1g");
	this.shape_15.setTransform(310.65,52.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F2F2F2").s().p("Ah/CYQgdgiAAhJIAAjoIAxAAIAADbQAAA0ANAYQATAhAwAAQA7AAAngvQAkgsAAg9IAAiwIAyAAIAAFuIgwAAIAAg3QAAgQABgNIgBAAQgOAighAaQgqAhg2AAQhAAAgdgkg");
	this.shape_16.setTransform(272.925,52.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F2F2F2").s().p("AgYEBIAAoBIAxAAIAAIBg");
	this.shape_17.setTransform(222.175,44.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F2F2F2").s().p("ABtC8IAAjcQAAgzgNgYQgRghgxgBQguAAglAeQglAcgMAvQgHAUAAAcIAACwIgxAAIAAluIAwAAIAAA2IAAAdIAAAAQAOghAggZQArgiA5AAQBCAAAeAlQAbAjAABHIAADog");
	this.shape_18.setTransform(171.25,51.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F2F2F2").s().p("AhrClQgngeAAg0QAAh9DggBIAUAAIAAgJQAAhfhbAAQg8AAgrAkIgXgnQAwgpBRAAQCJAAAACMIAADqIgvAAIAAgoIABgeIgBAAQgfBPhbAAQgyAAgjgbgAhfBQQAAAdAUATQAXAWAnAAQAwAAAhgsQAegpAAgzIAAgPIgVAAQisAAAABRg");
	this.shape_19.setTransform(129.125,52.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F2F2F2").s().p("AibC7QhIhNAAhwQAAhxBJhKQBLhLBtgBQB6AAA+BDIgbAlQg8g4hgAAQhZgBg6A+Qg7A+AABbQAABdA7A/QA7BBBZAAQBoAAA/hEIAdAkQhGBPh/AAQhvAAhLhOg");
	this.shape_20.setTransform(85.15,44.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.intro_text, new cjs.Rectangle(0,0,1057.9,91.6), null);


// stage content:
(lib.tool_guide_test = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,84,85,86];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.try_again1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(84);
		});
	}
	this.frame_84 = function() {
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
		_this.yes_button1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(85);
		});
		
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.no_button1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(87);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.try_again1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(84);
		});
	}
	this.frame_85 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.yes_button2.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(88);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.no_button2.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(86);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.try_again1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(84);
		});
	}
	this.frame_86 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.yes_button3.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(88);
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
		_this.gotoAndStop(89);
		});
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.try_again1.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(84);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(84).call(this.frame_84).wait(1).call(this.frame_85).wait(1).call(this.frame_86).wait(4));

	// Layer_5
	this.no_button1 = new lib.no_symbol();
	this.no_button1.name = "no_button1";
	this.no_button1.setTransform(867,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.no_button1, 0, 1, 2, false, new lib.no_symbol(), 3);

	this.no_button2 = new lib.no_symbol();
	this.no_button2.name = "no_button2";
	this.no_button2.setTransform(867,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.no_button2, 0, 1, 2, false, new lib.no_symbol(), 3);

	this.no_button3 = new lib.no_symbol();
	this.no_button3.name = "no_button3";
	this.no_button3.setTransform(867,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.no_button3, 0, 1, 2, false, new lib.no_symbol(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.no_button1}]},84).to({state:[{t:this.no_button2}]},1).to({state:[{t:this.no_button3}]},1).to({state:[]},1).wait(3));

	// Layer_4
	this.yes_button1 = new lib.yes_button();
	this.yes_button1.name = "yes_button1";
	this.yes_button1.setTransform(379,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.yes_button1, 0, 1, 2, false, new lib.yes_button(), 3);

	this.yes_button2 = new lib.yes_button();
	this.yes_button2.name = "yes_button2";
	this.yes_button2.setTransform(379,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.yes_button2, 0, 1, 2, false, new lib.yes_button(), 3);

	this.yes_button3 = new lib.yes_button();
	this.yes_button3.name = "yes_button3";
	this.yes_button3.setTransform(379,506.05,1,1,0,0,0,155,155);
	new cjs.ButtonHelper(this.yes_button3, 0, 1, 2, false, new lib.yes_button(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.yes_button1}]},84).to({state:[{t:this.yes_button2}]},1).to({state:[{t:this.yes_button3}]},1).to({state:[]},1).wait(3));

	// Layer_3
	this.instance = new lib.will_students_text();
	this.instance.setTransform(633.05,194.1,1,1,0,0,0,515,90.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#01192C").s().p("Ag9ESIAAhKIBKAAIAABKgAg8B+IAAgkQAAgmAUggQAOgVAegcQAigfAKgNQAUgaAAgdQAAgggYgWQgZgVgkAAQgwAAgnAgIgpg1QAygxBTAAQBCAAAtAnQAvAnAAA+QAAAqgVAiQgOAWggAdQglAggKAMQgVAbAAAeIAAAfg");
	this.shape.setTransform(1128.925,158.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgSgcgqAAQgqAAgiAaQggAagNAqQgFAUAAAfIAAC0IhKAAIAAmAIBHAAIAAAzQAAAPgCANIACAAQAPghAggXQAqggA2AAQCFAAAACTIAAD2g");
	this.shape_1.setTransform(1089.3,166.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#01192C").s().p("AgjEMIAAl/IBIAAIAAF/gAgkjAIAAhLIBJAAIAABLg");
	this.shape_2.setTransform(1056.625,159.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#01192C").s().p("AhuAhIAAhBIDdAAIAABBg");
	this.shape_3.setTransform(1029.275,164.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#01192C").s().p("AiQD0IAYg5QAwAZA6ABQA1AAAggZQAjgbAAg4IAAgcIABgZIgBAAQgkA9hNAAQhPgBgvg4Qgug3AAhUQAAhVAsg1QAug2BOAAQBcAAAcA5IABAAIgBgNIAAgjIBHAAIAAFvQAABZg8AvQg0AohQAAQhFAAg/ghgAhNiyQgcAiAAA7QAAA9AeAjQAfAmAyAAQBmAAAAiEQAAiBhsAAQgyAAgbAig");
	this.shape_4.setTransform(987.575,174.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#01192C").s().p("AiSCQQg9g6ABhWQAAhWA8g6QA8g4BWAAQBXAAA7A4QA+A6AABWQAABWg+A6Qg7A6hXgBQhWABg8g6gAhchiQgnAnAAA7QAAA7AnAoQAmAnA2gBQA3ABAmgnQAngoAAg7QAAg7gngnQgmgng3AAQg2AAgmAng");
	this.shape_5.setTransform(942.6,166.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#01192C").s().p("Ag/CiIAAmvIBJAAIAAGiQAAA3ApAAIANgBIAABBQgLACgNAAQhnAAAAhsg");
	this.shape_6.setTransform(910.475,159.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#01192C").s().p("AiSCQQg8g6gBhWQABhWA8g6QA8g4BWAAQBXAAA7A4QA+A6gBBWQABBWg+A6Qg7A6hXgBQhWABg8g6gAhchiQgnAnAAA7QAAA7AnAoQAmAnA2gBQA4ABAmgnQAmgoAAg7QAAg7gmgnQgmgng4AAQg2AAgmAng");
	this.shape_7.setTransform(855.6,166.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLACgPgBQg4AAgjgYg");
	this.shape_8.setTransform(818.225,161.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#01192C").s().p("AiIDZQgug4AAhaQAAhZAxg5QAwg2BNAAQBYAAAeA9IABAAQgBgMAAgOIAAiyIBJAAIAAIYIhGAAIAAglIABgaIgBAAQggBIheAAQhNAAgug4gAhKgeQghAmAAA/QAAA+AfAnQAeAlAvAAQAvAAAeghQAiglAAhFQAAg3gbglQgegrg0gBQguAAgfAkg");
	this.shape_9.setTransform(761.125,159.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#01192C").s().p("Ah6CPQg5g5AAhWQAAhaA3g4QA2g2BTAAQBPAAAtA0QAqAyAABOQABAJgDAVIkXAAQADA9AmAjQAlAfA1AAQBCABAwguIAeA2Qg4A3hdAAQhZABg5g7gABogsQgBgvgbgbQgagYgmAAQgrAAgeAZQgfAagIAvIDMAAIAAAAg");
	this.shape_10.setTransform(718.45,166.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#01192C").s().p("Ah6CPQg4g5gBhWQAAhaA3g4QA3g2BSAAQBOAAAuA0QArAyAABOQgBAJgCAVIkYAAQAEA9AmAjQAlAfA1AAQBCABAwguIAeA2Qg5A3hbAAQhaABg5g7gABogsQgCgvgbgbQgZgYgnAAQgpAAgfAZQgfAagIAvIDMAAIAAAAg");
	this.shape_11.setTransform(676.3,166.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgRgcgrAAQgqAAgiAaQghAagMAqQgFAUAAAfIAAC0IhKAAIAAmAIBHAAIAAAzQAAAPgCANIACAAQAPghAggXQAqggA3AAQCEAAAACTIAAD2g");
	this.shape_12.setTransform(632.65,166.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#01192C").s().p("AiNCRIAkg1QArAuBCgBQAZAAATgMQATgNAAgWQAAgYgegRQgIgEg7gaQgugTgWgUQgfgdgBgqQABgzApgeQAmgcA7AAQBUAAAnAqIgdA3Qgigig9AAQgZAAgRALQgUANAAAXQAAAXAfARIBCAdQAvATAWAUQAeAdAAArQAAAwglAgQgnAfg+AAQheAAgzg4g");
	this.shape_13.setTransform(572.85,166.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLACgPgBQg4AAgjgYg");
	this.shape_14.setTransform(542.275,161.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgSgcgqAAQgrAAggAaQgiAagLAqQgHAUAAAfIAAC0IhJAAIAAmAIBHAAIAAAzQAAAPgBANIABAAQAPghAggXQAqggA2AAQCFAAAACTIAAD2g");
	this.shape_15.setTransform(506.15,166.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#01192C").s().p("Ah6CPQg4g5gBhWQAAhaA3g4QA2g2BTAAQBPAAAtA0QAqAyAABOQABAJgDAVIkXAAQACA9AnAjQAlAfA1AAQBCABAwguIAeA2Qg4A3hcAAQhaABg5g7gABogsQgBgvgbgbQgagYgnAAQgqAAgeAZQgfAagIAvIDMAAIAAAAg");
	this.shape_16.setTransform(461.85,166.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#01192C").s().p("AiIDZQgug4AAhaQAAhZAxg5QAwg2BNAAQBYAAAeA9IABAAQgBgMAAgOIAAiyIBJAAIAAIYIhGAAIAAglIABgaIgBAAQggBIheAAQhNAAgug4gAhKgeQghAmAAA/QAAA+AfAnQAeAlAvAAQAvAAAeghQAiglAAhFQAAg3gbglQgegrg0gBQguAAgfAkg");
	this.shape_17.setTransform(416.725,159.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#01192C").s().p("AirAxIAAj1IBJAAIAADlQABAtANAWQARAcAqAAQA4AAAigsQAigpgBg7IAAi0IBKAAIAAGAIhHAAIAAg0QAAgPABgNIgBAAQgOAigiAYQgqAfgyAAQiEAAAAiUg");
	this.shape_18.setTransform(372.2,167.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLACgPgBQg4AAgjgYg");
	this.shape_19.setTransform(336.075,161.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#01192C").s().p("AiNCRIAkg1QArAuBCgBQAZAAATgMQATgNABgWQAAgYgggRQgHgEg7gaQgvgTgVgUQgfgdAAgqQgBgzApgeQAngcA7AAQBUAAAnAqIgdA3Qgigig9AAQgZAAgSALQgTANAAAXQAAAXAfARIBCAdQAvATAWAUQAeAdAAArQAAAwglAgQgnAfg+AAQheAAgzg4g");
	this.shape_20.setTransform(305.45,166.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#01192C").s().p("Ag/CiIAAmvIBJAAIAAGiQAAA3ApAAIANgBIAABBQgLACgNAAQhnAAAAhsg");
	this.shape_21.setTransform(260.625,159.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#01192C").s().p("Ag/CiIAAmvIBJAAIAAGiQAAA3ApAAIANgBIAABBQgLACgNAAQhnAAAAhsg");
	this.shape_22.setTransform(240.525,159.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#01192C").s().p("AgjEMIAAl/IBIAAIAAF/gAgkjAIAAhLIBJAAIAABLg");
	this.shape_23.setTransform(219.375,159.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#01192C").s().p("ABsEMIhdlbQgJgigGgqIgBAAQgIAqgIAiIhdFbIhXAAIiJoXIBNAAIBfGIQAHAdADAdIABAAQAEgcAIgeIBpmIIBBAAIBpGIQAIAeAEAcIABAAQADgdAIgdIBimIIBNAAIiMIXg");
	this.shape_24.setTransform(174,159.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#01192C").s().p("AiSCQQg9g6AAhWQAAhXA9g5QA8g4BWgBQBXABA8A4QA8A5ABBXQgBBWg8A6Qg8A5hXABQhWgBg8g5gAhchjQgnAoAAA7QAAA6AnAoQAmAoA2AAQA3AAAngoQAmgnAAg7QAAg7gmgoQgngmg3AAQg2AAgmAmg");
	this.shape_25.setTransform(832.95,284.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#01192C").s().p("AiSCQQg9g6ABhWQgBhXA9g5QA8g4BWgBQBXABA7A4QA+A5AABXQAABWg+A6Qg7A5hXABQhWgBg8g5gAhchjQgnAoAAA7QAAA6AnAoQAmAoA2AAQA3AAAmgoQAngnAAg7QAAg7gngoQgmgmg3AAQg2AAgmAmg");
	this.shape_26.setTransform(785.55,284.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLACgPAAQg4AAgjgYg");
	this.shape_27.setTransform(748.175,279.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#01192C").s().p("Ah6CPQg5g5AAhWQAAhaA3g4QA2g2BTgBQBPAAAtA1QAqAxAABOQABALgDAVIkXAAQACA8AnAiQAlAgA1ABQBCAAAwgtIAeA2Qg4A3hcAAQhagBg5g6gABogsQgCgwgagaQgagYgnAAQgqAAgeAZQgfAagIAvIDMAAIAAAAg");
	this.shape_28.setTransform(694.05,284.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#01192C").s().p("ABkEMIAAjlQAAgugNgWQgRgcgrAAQgqAAghAbQgiAagLApQgHAUAAAfIAAC0IhJAAIAAoXIBJAAIAADFQAAASgBAOIABAAQAPgiAigYQApgcA0AAQCEAAAACSIAAD2g");
	this.shape_29.setTransform(650.4,276.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLACgPAAQg4AAgjgYg");
	this.shape_30.setTransform(613.525,279.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#01192C").s().p("ABkEMIAAjlQAAgugNgWQgSgcgqAAQgpAAgjAbQggAagNApQgFAUgBAfIAAC0IhJAAIAAoXIBJAAIAADFQAAASgBAOIABAAQAPgiAigYQApgcAzAAQCFAAAACSIAAD2g");
	this.shape_31.setTransform(493.2,276.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLACgPAAQg4AAgjgYg");
	this.shape_32.setTransform(456.325,279.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#01192C").s().p("ABbDAIhQj2QgGgUgEgVIgBAAQgEAVgGAUIhPD2IhSAAIh8l/IBOAAIBQENQAGATADAVIACAAQAEgVAGgTIBTkMIBDAAIBTEMQAGATAFAVIABAAQADgVAGgTIBRkNIBNAAIh8F/g");
	this.shape_33.setTransform(392.975,284.275);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#01192C").s().p("AhLE7QBUicAAisQAAiehUiQIBAAAQBYCNAACfQAAC3hYCTg");
	this.shape_34.setTransform(1189.05,186);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#01192C").s().p("Ah6CPQg5g5AAhWQAAhaA4g4QA1g3BTAAQBPAAAtA1QAqAxAABOQAAAKgCAVIkXAAQADA9AnAjQAjAfA2AAQBCAAAwgtIAeA2Qg4A3hdAAQhYABg6g7gABogsQgCgvgagbQgagYgmAAQgrAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_35.setTransform(1158.2,191.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLABgPAAQg4AAgjgYg");
	this.shape_36.setTransform(1123.475,185.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#01192C").s().p("Ah6CPQg5g5ABhWQAAhaA3g4QA2g3BSAAQBOAAAuA1QArAxAABOQgBAKgCAVIkYAAQADA9AnAjQAlAfA1AAQBCAAAwgtIAeA2Qg5A3hbAAQhaABg5g7gABogsQgCgvgbgbQgZgYgnAAQgpAAgfAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_37.setTransform(1088.85,191.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#01192C").s().p("Ah6CPQg4g5gBhWQAAhaA3g4QA2g3BTAAQBPAAAtA1QAqAxAABOQAAAKgCAVIkXAAQACA9AnAjQAlAfA1AAQBCAAAwgtIAeA2Qg4A3hcAAQhaABg5g7gABogsQgCgvgagbQgagYgnAAQgqAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_38.setTransform(1026.6,191.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#01192C").s().p("AiIDYQgug3AAhaQAAhZAxg5QAwg2BNAAQBYAAAeA9IABAAQgBgMAAgOIAAiyIBJAAIAAIYIhGAAIAAglIABgaIgBAAQggBIheAAQhNAAgug5gAhKgeQghAmAAA/QAAA+AfAmQAeAmAvAAQAvAAAeghQAiglAAhFQAAg3gbglQgegrg0AAQgugBgfAkg");
	this.shape_39.setTransform(981.475,183.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#01192C").s().p("AhpDDIAAmAIBHAAIAABDQAAAQgBANIABAAQAOgsAegbQAigeArAAQAJAAAKACIAABJQgKgCgMAAQgjAAgeAYQgcAYgOAqQgIAegBAmIAACeg");
	this.shape_40.setTransform(928.3,190.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#01192C").s().p("AiSCQQg9g6AAhWQAAhXA9g5QA8g5BWAAQBXAAA8A5QA8A5AABXQAABWg8A6Qg8A6hXgBQhWABg8g6gAhchiQgnAnAAA7QAAA7AnAoQAmAnA2gBQA3ABAngnQAmgoAAg7QAAg7gmgnQgngng3AAQg2AAgmAng");
	this.shape_41.setTransform(888.2,191.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLABgPAAQg4AAgjgYg");
	this.shape_42.setTransform(831.325,185.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#01192C").s().p("AgjEMIAAl/IBIAAIAAF/gAgkjAIAAhLIBJAAIAABLg");
	this.shape_43.setTransform(808.325,183.475);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#01192C").s().p("AiIDYQgug3AAhaQAAhZAxg5QAwg2BNAAQBYAAAeA9IABAAQgBgMAAgOIAAiyIBJAAIAAIYIhGAAIAAglIABgaIgBAAQggBIheAAQhNAAgug5gAhKgeQghAmAAA/QAAA+AfAmQAeAmAvAAQAvAAAeghQAiglAAhFQAAg3gbglQgegrg0AAQgugBgfAkg");
	this.shape_44.setTransform(774.825,183.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#01192C").s().p("Ah6CPQg4g5AAhWQAAhaA3g4QA2g3BSAAQBPAAAtA1QAqAxAABOQAAAKgCAVIkYAAQADA9AoAjQAjAfA2AAQBCAAAwgtIAeA2Qg4A3hdAAQhYABg6g7gABogsQgCgvgagbQgZgYgnAAQgrAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_45.setTransform(732.15,191.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#01192C").s().p("Ag8BOIAvibIBKAAIg/Cbg");
	this.shape_46.setTransform(680.425,210.15);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#01192C").s().p("Ah6CPQg4g5AAhWQAAhaA3g4QA2g3BSAAQBPAAAtA1QAqAxAABOQAAAKgCAVIkYAAQADA9AoAjQAjAfA2AAQBCAAAwgtIAeA2Qg4A3hdAAQhYABg6g7gABogsQgCgvgagbQgZgYgnAAQgrAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_47.setTransform(651.15,191.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLABgPAAQg4AAgjgYg");
	this.shape_48.setTransform(616.425,185.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#01192C").s().p("Ah4CrQgoggAAg3QAAiDDnAAIAQAAIAAgHQAAhVhUAAQg6ABgwAkIgfg1QA4gtBXgBQBJAAAoAnQAnAnAABJIAADyIhEAAIAAglQAAgRABgNIgBAAQgfBNhbgBQg2ABglgfgAhWBRQAAAZASAQQAUAUAjAAQArAAAegoQAcglAAgtIAAgNIgTAAQibAAAABKg");
	this.shape_49.setTransform(581.575,191.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#01192C").s().p("Ah6CPQg5g5AAhWQAAhaA4g4QA2g3BSAAQBPAAAtA1QAqAxAABOQAAAKgCAVIkXAAQACA9AoAjQAjAfA2AAQBCAAAwgtIAeA2Qg4A3hdAAQhZABg5g7gABogsQgCgvgagbQgZgYgnAAQgrAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_50.setTransform(541.7,191.1);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#01192C").s().p("AhpDDIAAmAIBHAAIAABDQAAAQgCANIACAAQAOgsAegbQAigeArAAQAKAAAJACIAABJQgKgCgMAAQgjAAgeAYQgdAYgNAqQgIAegBAmIAACeg");
	this.shape_51.setTransform(508.55,190.825);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#01192C").s().p("Ah5CQQg6g5AAhXQAAhVA6g6QA6g6BZAAQBhABAvA4IgiAzQgqgshBAAQg5AAgmAnQglAnAAA7QAAA6AlAoQAnAoA6gBQBIAAAvg0IAeA2Qg2A/hkgBQhZABg6g6g");
	this.shape_52.setTransform(471.625,191.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#01192C").s().p("Ag8BOIAvibIBKAAIg/Cbg");
	this.shape_53.setTransform(419.925,210.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#01192C").s().p("Ah6CPQg4g5gBhWQAAhaA3g4QA3g3BSAAQBOAAAuA1QAqAxABBOQgBAKgCAVIkXAAQACA9AnAjQAlAfA1AAQBCAAAwgtIAeA2Qg4A3hcAAQhaABg5g7gABogsQgCgvgbgbQgYgYgoAAQgqAAgeAZQgfAbgIAuIDMAAIAAAAg");
	this.shape_54.setTransform(390.65,191.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#01192C").s().p("AgFDeQg3gjAAhUIAAizIgzAAIAAg7IA1AAIAAhvIBGAAIAABvIBdAAIAAA7IhdAAIAACqQAABXBSAAQALAAAHgBIAABBQgLABgPAAQg4AAgjgYg");
	this.shape_55.setTransform(355.925,185.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#01192C").s().p("AiSCQQg9g6ABhWQgBhXA9g5QA8g5BWAAQBXAAA8A5QA8A5ABBXQgBBWg8A6Qg8A6hXgBQhWABg8g6gAhchiQgnAnAAA7QAAA7AnAoQAmAnA2gBQA3ABAmgnQAngoAAg7QAAg7gngnQgmgng3AAQg2AAgmAng");
	this.shape_56.setTransform(318.7,191.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#01192C").s().p("AgpDAIiQl/IBPAAIBdEDQAIAVAFAfIABAAQAGgfAHgVIBekDIBOAAIiPF/g");
	this.shape_57.setTransform(275.925,191.075);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#01192C").s().p("AAME7QhXiTAAi3QAAifBXiNIBAAAQhUCQAACeQAACsBUCcg");
	this.shape_58.setTransform(247.075,186);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#01192C").s().p("Ai8D5IAag4QAWAPAXAAQAuAAAXg4IATgsIihl7IBTAAIBgD8QAIATAGAaIABAAQAHgaAGgTIBej8IBQAAIi0HEQgjBbhZAAQgrAAgggXg");
	this.shape_59.setTransform(194.875,199.05);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#01192C").s().p("Ah4CrQgoggAAg3QAAiDDnAAIAQAAIAAgHQAAhVhUAAQg6ABgwAkIgfg1QA4gtBXgBQBJAAAoAnQAnAnAABJIAADyIhEAAIAAglQAAgRABgNIgBAAQgfBNhbgBQg2ABglgfgAhWBRQAAAZASAQQAUAUAjAAQArAAAegoQAcglAAgtIAAgNIgTAAQibAAAABKg");
	this.shape_60.setTransform(154.325,191.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#01192C").s().p("ABbDAIhQj2QgGgUgEgVIgBAAQgEAVgGAUIhPD2IhSAAIh8l/IBOAAIBQENQAGATADAVIACAAQAEgVAGgTIBTkMIBDAAIBTEMQAGATAFAVIABAAQADgVAGgTIBRkNIBNAAIh8F/g");
	this.shape_61.setTransform(104.625,191.075);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#01192C").s().p("Ai8D4IAag4QAWAQAXAAQAuAAAXg4IATgsIihl7IBTAAIBgD7QAIAUAGAaIABAAQAHgaAGgTIBej8IBQAAIi0HFQgjBahZAAQgrAAgggYg");
	this.shape_62.setTransform(1158.075,105.85);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgSgcgqAAQgqAAghAaQgiAagLAqQgHAUAAAfIAAC0IhJAAIAAmAIBHAAIAAAzQAAAPgBANIABAAQAPghAggXQAqggA3AAQCEAAAACTIAAD2g");
	this.shape_63.setTransform(1116.25,97.425);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#01192C").s().p("Ah4CrQgoghAAg2QAAiDDnAAIAQAAIAAgHQAAhVhUABQg6gBgwAmIgfg2QA4gtBXAAQBJAAAoAmQAnAnAABJIAADyIhEAAIAAgkQAAgSABgNIgBAAQgfBMhbABQg2AAglgfgAhWBQQAAAaASARQAUATAjAAQArAAAegoQAcglAAguIAAgMIgTAAQibAAAABJg");
	this.shape_64.setTransform(1071.725,97.9);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgRgcgrAAQgrAAggAaQgiAagLAqQgHAUAAAfIAAC0IhJAAIAAmAIBHAAIAAAzQAAAPgBANIABAAQAPghAggXQAqggA3AAQCEAAAACTIAAD2g");
	this.shape_65.setTransform(1010.85,97.425);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#01192C").s().p("AgjEMIAAl/IBIAAIAAF/gAgkjAIAAhLIBJAAIAABLg");
	this.shape_66.setTransform(978.175,90.275);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#01192C").s().p("Ah6CPQg5g5AAhWQAAhaA3g4QA2g3BTABQBPgBAtA1QAqAyAABOQABAKgDAUIkXAAQADA9AmAiQAlAgA1ABQBCAAAwgtIAeA2Qg4A3hdAAQhZAAg5g7gABogsQgBgwgbgaQgagYgmAAQgrAAgeAZQgfAagIAvIDMAAIAAAAg");
	this.shape_67.setTransform(928.15,97.9);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLABgPAAQg4ABgjgYg");
	this.shape_68.setTransform(893.425,92.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#01192C").s().p("AirAxIAAj1IBJAAIAADlQABAuANAVQARAcAqAAQA4AAAigsQAigpgBg7IAAi0IBKAAIAAF/IhHAAIAAgzQAAgQACgMIgCAAQgOAigiAZQgqAegyAAQiEAAAAiUg");
	this.shape_69.setTransform(856.95,98.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#01192C").s().p("AhwDPIgCAAQACAMAAAQIAAAcIhGAAIAAoXIBKAAIAACvQAAATgCAOIACAAQAghBBaAAQBNAAAuA4QAuA3AABaQAABagyA4QgxA3hMAAQhVAAgjhCgAhNggQgiAjAABGQAAA4AbAlQAfAsAzgBQAvABAeglQAhgmAAg/QAAg+geglQgegmgwABQgvgBgeAhg");
	this.shape_70.setTransform(812.975,90.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#01192C").s().p("AgjEMIAAl/IBIAAIAAF/gAgkjAIAAhLIBJAAIAABLg");
	this.shape_71.setTransform(779.425,90.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#01192C").s().p("AhpDDIAAmAIBHAAIAABDQAAAQgBANIABAAQAOgsAfgbQAhgeArAAQAJAAAKACIAABJQgKgCgMAAQgkAAgcAYQgdAYgOAqQgJAeAAAmIAACeg");
	this.shape_72.setTransform(757.9,97.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLABgPAAQg4ABgjgYg");
	this.shape_73.setTransform(727.825,92.75);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgRgcgrAAQgrAAggAaQgiAagLAqQgHAUABAfIAAC0IhKAAIAAmAIBHAAIAAAzQAAAPgCANIACAAQAPghAggXQAqggA3AAQCEAAAACTIAAD2g");
	this.shape_74.setTransform(691.7,97.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#01192C").s().p("AiSCQQg8g6AAhWQAAhXA8g5QA8g5BWABQBXgBA7A5QA+A5gBBXQABBWg+A6Qg7A6hXAAQhWAAg8g6gAhchjQgnAoAAA7QAAA6AnAoQAmAoA2AAQA4AAAlgoQAngnAAg7QAAg7gngoQglgmg4AAQg2AAgmAmg");
	this.shape_75.setTransform(644.8,97.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#01192C").s().p("Ah5CQQg6g5AAhXQAAhWA6g5QA6g5BZAAQBhAAAvA3IgiA1QgqgthBAAQg5AAgmAnQglAmAAA8QAAA6AlAnQAnApA6AAQBIAAAvg0IAeA2Qg2A9hkABQhZAAg6g6g");
	this.shape_76.setTransform(600.575,97.9);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#01192C").s().p("AiOCRIAkg0QAsAtBCAAQAZAAATgNQATgNABgXQAAgWgggSQgHgEg7gaQgvgTgVgUQgggdABgqQgBgzApgeQAngdA7ABQBUAAAoAqIgeA3Qgigig9AAQgZAAgSALQgTANAAAXQAAAXAfARIBCAdQAuATAXATQAeAeAAAqQAAAxglAfQgnAgg+ABQheAAg0g5g");
	this.shape_77.setTransform(542.95,97.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLABgPAAQg4ABgjgYg");
	this.shape_78.setTransform(512.375,92.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgRgcgrAAQgrAAggAaQgiAagLAqQgHAUAAAfIAAC0IhJAAIAAmAIBHAAIAAAzQAAAPgBANIABAAQAPghAggXQAqggA3AAQCEAAAACTIAAD2g");
	this.shape_79.setTransform(476.25,97.425);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#01192C").s().p("Ah6CPQg4g5AAhWQgBhaA3g4QA3g3BSABQBOgBAuA1QArAyAABOQgBAKgCAUIkYAAQAEA9AmAiQAlAgA1ABQBCAAAwgtIAeA2Qg5A3hbAAQhaAAg5g7gABogsQgCgwgbgaQgZgYgnAAQgpAAgfAZQgfAagIAvIDMAAIAAAAg");
	this.shape_80.setTransform(431.95,97.9);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#01192C").s().p("AiIDZQgug4AAhZQAAhaAxg5QAwg2BNAAQBYAAAeA8IABAAQgBgLAAgPIAAixIBJAAIAAIXIhGAAIAAgkIABgaIgBAAQggBIheAAQhNAAgug4gAhKgeQghAmAABAQAAA9AfAnQAeAlAvAAQAvAAAeghQAigkAAhFQAAg4gbgmQgegrg0AAQguABgfAjg");
	this.shape_81.setTransform(386.825,90.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#01192C").s().p("AirAxIAAj1IBKAAIAADlQgBAuANAVQASAcAqAAQA4AAAigsQAigpAAg7IAAi0IBJAAIAAF/IhHAAIAAgzQAAgQABgMIgBAAQgOAigiAZQgqAegzAAQiDAAAAiUg");
	this.shape_82.setTransform(342.3,98.35);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#01192C").s().p("AgFDfQg3gkAAhUIAAiyIgzAAIAAg8IA1AAIAAhuIBGAAIAABuIBdAAIAAA8IhdAAIAACqQAABWBSAAQALAAAHgCIAABCQgLABgPAAQg4ABgjgYg");
	this.shape_83.setTransform(306.175,92.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#01192C").s().p("AiOCRIAkg0QAsAtBCAAQAZAAASgNQAVgNAAgXQAAgWgggSQgGgEg8gaQgvgTgVgUQgggdABgqQAAgzAogeQAngdA7ABQBUAAAoAqIgeA3Qgigig9AAQgaAAgRALQgTANAAAXQAAAXAeARIBDAdQAuATAXATQAeAeAAAqQAAAxglAfQgnAgg+ABQhdAAg1g5g");
	this.shape_84.setTransform(275.55,97.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#01192C").s().p("ABkDFIAAjlQAAgugNgWQgSgcgqAAQgqAAgiAaQggAagNAqQgFAUgBAfIAAC0IhJAAIAAmAIBHAAIAAAzQAAAPgCANIACAAQAPghAggXQAqggA2AAQCFAAAACTIAAD2g");
	this.shape_85.setTransform(216.55,97.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#01192C").s().p("Ah4CrQgoghAAg2QAAiDDnAAIAQAAIAAgHQAAhVhUABQg6gBgwAmIgfg2QA4gtBXAAQBJAAAoAmQAnAnAABJIAADyIhEAAIAAgkQAAgSABgNIgBAAQgfBMhbABQg2AAglgfgAhWBQQAAAaASARQAUATAjAAQArAAAegoQAcglAAguIAAgMIgTAAQibAAAABJg");
	this.shape_86.setTransform(172.025,97.9);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#01192C").s().p("AikDEQhMhQAAh3QAAh0BOhPQBOhPB0AAQCBAABCBHIglA4Qg/g6hcAAQhYAAg4A7Qg2A7AABXQAABXA3A9QA5A/BWAAQBlAABBhGIAoA2QhJBWiHAAQh3AAhOhSg");
	this.shape_87.setTransform(126.175,90.3);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#01192C").s().p("AAkBMIgghhIgEgQIAAAAIgEAQIgeBhIghAAIgxiXIAfAAIAgBpIADARIABAAIAEgRIAhhpIAZAAIAhBpIAFARIAAAAIAEgRIAghpIAeAAIgxCXg");
	this.shape_88.setTransform(991.75,552.45);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiAAQAjAAAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQgigBgXgWgAgkgmQgPAQAAAWQAAAXAPAQQAQAQAUAAQAWAAAPgQQAPgQAAgXQAAgWgPgQQgPgPgWAAQgUAAgQAPg");
	this.shape_89.setTransform(970.2,552.45);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAWAQgBIAFAAIAAAaIgJABQgoAAAAgrg");
	this.shape_90.setTransform(957.575,549.5);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#01192C").s().p("AgYBrIAAh+IgTAAIAAgXIATAAIAAgHQABghAUgOQAOgKAVAAIAMABIAAAZIgIAAQggAAAAAfIAAAHIAkAAIAAAXIgkAAIAAB+g");
	this.shape_91.setTransform(948.45,549.375);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_92.setTransform(934.025,552.275);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_93.setTransform(916.525,552.45);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_94.setTransform(899.875,552.45);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_95.setTransform(886.775,552.375);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgWQAYgYAjAAQAmAAASAXIgNAUQgRgRgZAAQgXAAgOAPQgPAQgBAWQABAXAPAPQAPAQAXABQAbAAATgVIAMAVQgVAZgnAAQgkgBgXgWg");
	this.shape_96.setTransform(872.2,552.45);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#01192C").s().p("AhEBSIARgXQAXAXAeAAQAQAAAKgIQALgIAAgPQAAgQgQgKQgHgFgcgNQgYgJgLgLQgQgOAAgWQAAgaATgQQAUgSAdAAQAnABAVAVIgOAYQgTgSgbAAQgQAAgLAJQgLAJAAANQAAAOAQALQAGADAcANQAZAKALALQAQAPAAAXQAAAZgSARQgTARgeABQgsAAgagcg");
	this.shape_97.setTransform(855.675,549.45);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#01192C").s().p("AgXAfIASg9IAdAAIgYA9g");
	this.shape_98.setTransform(835.425,560);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_99.setTransform(823.875,552.45);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_100.setTransform(811.825,549.45);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#01192C").s().p("AgQBMIg4iXIAfAAIAlBmQADAIABAMIAAAAQADgMADgIIAlhmIAeAAIg4CXg");
	this.shape_101.setTransform(800.575,552.45);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiAAQAiAAAYAXQAYAXAAAhQAAAigYAXQgYAWgiABQgigBgXgWgAgkgmQgPAQAAAWQAAAXAPAQQAPAQAVAAQAWAAAPgQQAPgQAAgXQAAgWgPgQQgPgPgWAAQgVAAgPAPg");
	this.shape_102.setTransform(783.7,552.45);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#01192C").s().p("ABOBqIgKiFQgCgNABgSIAAAAQgHAUgEALIgrBfIgaAAIgqhfIgLgfIgBAAQABATgBAMIgKCFIgdAAIAQjTIAgAAIAwBxIAKAeIAAAAIALgeIAwhxIAgAAIAQDTg");
	this.shape_103.setTransform(761.4,549.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_104.setTransform(744.675,549.45);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#01192C").s().p("AgOBMIAAgfIAdAAIAAAfgAgOgsIAAgfIAdAAIAAAfg");
	this.shape_105.setTransform(728.875,552.45);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_106.setTransform(715.025,549.625);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_107.setTransform(698.175,552.45);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgWQAYgYAjAAQAlAAAUAXIgPAUQgPgRgaAAQgXAAgOAPQgQAQABAWQgBAXAQAPQAPAQAXABQAbAAATgVIAMAVQgVAZgnAAQgjgBgYgWg");
	this.shape_108.setTransform(681.75,552.45);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_109.setTransform(664.575,552.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgWQAWgRAigBQAdAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIACgNIgCAAQgLAfgkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_110.setTransform(647,552.45);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_111.setTransform(630.725,552.275);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_112.setTransform(617.825,549.45);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#01192C").s().p("AgYBrIAAh+IgTAAIAAgXIATAAIAAgHQABghAUgOQAOgKAVAAIAMABIAAAZIgIAAQggAAAAAfIAAAHIAkAAIAAAXIgkAAIAAB+g");
	this.shape_113.setTransform(609.6,549.375);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#01192C").s().p("AgrANIAAgZIBXAAIAAAZg");
	this.shape_114.setTransform(596.975,551.5);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#01192C").s().p("AgYBrIAAh+IgTAAIAAgXIATAAIAAgHQAAghAWgOQANgKAWAAIALABIAAAZIgIAAQggAAAAAfIAAAHIAkAAIAAAXIgkAAIAAB+g");
	this.shape_115.setTransform(585.4,549.375);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAWAQgBIAFAAIAAAaIgJABQgoAAAAgrg");
	this.shape_116.setTransform(576.575,549.5);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_117.setTransform(563.625,552.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_118.setTransform(548.575,552.45);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#01192C").s().p("AgyB2IBLjrIAaAAIhLDrg");
	this.shape_119.setTransform(528.3,549.525);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_120.setTransform(505.525,552.275);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiAAQAjAAAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQgigBgXgWgAgjgmQgQAQAAAWQAAAXAQAQQAPAQAUAAQAWAAAPgQQAPgQAAgXQAAgWgPgQQgPgPgWAAQgUAAgPAPg");
	this.shape_121.setTransform(487,552.45);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_122.setTransform(473.925,549.45);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_123.setTransform(463.475,552.45);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_124.setTransform(452.025,552.375);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_125.setTransform(437.225,552.45);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#01192C").s().p("AgQBMIg4iXIAfAAIAlBmQADAIABAMIAAAAQADgMADgIIAlhmIAeAAIg4CXg");
	this.shape_126.setTransform(421.375,552.45);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_127.setTransform(397.825,552.45);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_128.setTransform(381.175,552.45);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_129.setTransform(368.075,552.375);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#01192C").s().p("AgXBrIAAh+IgUAAIAAgXIAUAAIAAgHQgBghAWgOQANgKAWAAIAKABIAAAZIgHAAQggAAABAfIAAAHIAjAAIAAAXIgjAAIAAB+g");
	this.shape_130.setTransform(357.1,549.375);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAggBQAfABASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_131.setTransform(335.525,552.45);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_132.setTransform(320.475,552.45);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#01192C").s().p("Ag7BWQgXgVAAgkIAAiIIAdAAIAACIQAAAYAPAOQAOAOAYAAQAYAAAPgOQAPgOAAgYIAAiIIAdAAIAACIQAAAkgXAVQgXAWglAAQgkAAgXgWg");
	this.shape_133.setTransform(302.925,549.625);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#01192C").s().p("AgvBEQgQgNAAgWQAAgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAiABQAcAAAQAPQAPAQABAcIAABfIgbAAIAAgPIABgMIgBAAQgNAegjAAQgVAAgPgLgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_134.setTransform(795.15,514.45);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_135.setTransform(784.025,511.45);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#01192C").s().p("Ag3A6IAOgVQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgWg");
	this.shape_136.setTransform(773.575,514.45);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#01192C").s().p("AgvBEQgQgNAAgWQAAgzBbAAIAGAAIAAgDQABghgiAAQgWAAgTAPIgMgVQAWgTAiABQAdAAAPAPQAPAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgMAegjAAQgVAAgPgLgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_137.setTransform(758.5,514.45);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_138.setTransform(745.725,512.425);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_139.setTransform(726.825,514.275);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#01192C").s().p("AgvBEQgQgNAAgWQAAgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAiABQAcAAAQAPQAPAQAAAcIAABfIgbAAIAAgPIACgMIgCAAQgLAegkAAQgVAAgPgLgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_140.setTransform(704.6,514.45);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#01192C").s().p("AhABOQgeggAAguQAAguAegfQAfggAtAAQAzAAAaAcIgOAXQgZgYgkAAQgiAAgWAYQgWAXAAAiQAAAjAWAYQAWAYAiAAQAoAAAZgcIAQAWQgdAig1gBQguAAgfgfg");
	this.shape_141.setTransform(686.525,511.45);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#01192C").s().p("AgOBMIAAgfIAdAAIAAAfgAgOgsIAAgfIAdAAIAAAfg");
	this.shape_142.setTransform(663.475,514.45);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_143.setTransform(650.775,514.45);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgXQAYgWAiAAQAngBASAXIgNAUQgQgRgbAAQgWAAgOAPQgPAPgBAXQABAXAPAQQAPAQAWAAQAcgBATgUIAMAWQgVAYgogBQgjAAgXgWg");
	this.shape_144.setTransform(634.35,514.45);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_145.setTransform(617.175,514.275);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_146.setTransform(599.675,514.45);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#01192C").s().p("AgvA5QgXgWAAgjQAAghAXgXQAXgWAiAAQAmgBAUAXIgPAUQgPgRgbAAQgVAAgQAPQgPAPAAAXQAAAXAPAQQAQAQAWAAQAcgBATgUIAMAWQgVAYgogBQgiAAgXgWg");
	this.shape_147.setTransform(583.25,514.45);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_148.setTransform(571.225,511.45);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#01192C").s().p("AgYBAIAAipIAcAAIAACkQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_149.setTransform(564.225,511.5);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_150.setTransform(542.425,511.625);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_151.setTransform(530.175,511.45);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#01192C").s().p("AgvBEQgPgNAAgWQgBgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAQAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgNAegjAAQgVAAgPgLgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_152.setTransform(518.05,514.45);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#01192C").s().p("AhHBqIAAjTIBMAAQAeAAASATQATASAAAeQAAAdgTASQgSASgeAAIguAAIAABPgAgpACIApAAQAUAAALgLQALgLAAgSQAAgUgLgKQgLgLgUAAIgpAAg");
	this.shape_153.setTransform(502.55,511.45);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_154.setTransform(996.925,474.425);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_155.setTransform(987.875,473.45);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#01192C").s().p("Ag5BhIAKgXQATAKAXAAQAUAAANgKQAOgLAAgWIAAgLIAAgJIgBAAQgOAXgeAAQgeAAgTgWQgSgWAAggQAAgiASgUQARgWAfAAQAkAAALAWIAAAAIAAgEIAAgPIAcAAIAACRQAAAjgXASQgWAQgeAAQgbAAgagMgAgehFQgLANAAAXQAAAYAMAOQAMAOAUAAQAnAAAAgzQAAgzgqAAQgTAAgLAOg");
	this.shape_156.setTransform(974.8,479.425);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#01192C").s().p("AguBEQgRgNABgWQAAgzBaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAPAQAAAcIAABfIgbAAIAAgPIABgLIgBAAQgLAdgkAAQgVAAgOgLgAghAgQAAAKAHAHQAIAHANAAQARAAAMgPQALgPAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_157.setTransform(958,476.45);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_158.setTransform(941.725,476.275);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#01192C").s().p("AhEBRIARgVQAXAWAeAAQAQAAAKgIQALgJAAgOQAAgPgQgLQgHgFgcgMQgYgLgLgJQgQgQAAgWQAAgYATgRQAUgRAdAAQAngBAVAWIgOAZQgTgTgbAAQgQAAgLAJQgLAJAAANQAAAOAQAKQAGAFAcAMQAZAKALAKQAQAQAAAXQAAAZgSARQgTARgeAAQgsAAgagcg");
	this.shape_159.setTransform(924.325,473.45);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#01192C").s().p("AgOBMIAAgfIAdAAIAAAfgAgOgsIAAgfIAdAAIAAAfg");
	this.shape_160.setTransform(904.125,476.45);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#01192C").s().p("Ag5BhIALgXQASAKAXAAQAVAAAMgKQAOgLAAgWIAAgLIABgJIgCAAQgNAXgfAAQgeAAgTgWQgSgWAAggQAAgiASgUQASgWAeAAQAkAAALAWIABAAIgBgEIAAgPIAcAAIAACRQAAAjgYASQgUAQggAAQgbAAgZgMgAgehFQgLANAAAXQAAAYAMAOQAMAOATAAQApAAAAgzQAAgzgrAAQgTAAgLAOg");
	this.shape_161.setTransform(890.4,479.425);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAiAAQAjAAAXAWQAYAWAAAiQAAAigYAXQgXAXgjgBQgiABgXgXgAgjgmQgQAPAAAXQAAAYAQAPQAPAPAUAAQAWAAAPgPQAPgPAAgYQAAgXgPgPQgPgPgWAAQgUAAgPAPg");
	this.shape_162.setTransform(872.65,476.45);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#01192C").s().p("AgYBAIAAipIAcAAIAACkQAAAVAQABIAFAAIAAAZIgJAAQgoAAAAgqg");
	this.shape_163.setTransform(860.025,473.5);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#01192C").s().p("AgvBEQgPgNAAgWQgBgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAQAQAAAcIAABfIgbAAIAAgPIABgLIgBAAQgNAdgjAAQgVAAgPgLgAghAgQAAAKAHAHQAIAHAOAAQAQAAAMgPQALgPAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_164.setTransform(847,476.45);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_165.setTransform(834.225,474.425);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#01192C").s().p("AguBEQgQgNgBgWQAAgzBbAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAiABQAdAAAPAPQAPAQAAAcIAABfIgbAAIAAgPIABgLIgBAAQgMAdgjAAQgVAAgOgLgAghAgQAAAKAHAHQAIAHAOAAQAQAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_166.setTransform(820.5,476.45);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#01192C").s().p("AgvA5QgXgWAAgjQAAghAXgXQAXgXAiABQAnAAASAWIgNAUQgQgRgbAAQgWAAgPAPQgPAPAAAXQAAAXAPAQQAQAPAWAAQAdAAASgUIAMAWQgVAXgoAAQgjABgWgXg");
	this.shape_167.setTransform(805,476.45);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_168.setTransform(780.125,476.275);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#01192C").s().p("AgOBqIAAjTIAdAAIAADTg");
	this.shape_169.setTransform(766.625,473.45);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#01192C").s().p("AgOBMIAAgfIAdAAIAAAfgAgOgsIAAgfIAdAAIAAAfg");
	this.shape_170.setTransform(750.175,476.45);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#01192C").s().p("AgdB8QAhg9AAhDQAAg/ghg5IAaAAQAhA4AAA/QAABHghA6g");
	this.shape_171.setTransform(740.6,474.45);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#01192C").s().p("AgwA5QgWgXAAgiQAAgiAWgXQAVgWAgABQAfgBASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaABATgTIAMAWQgWAWglgBQgiAAgXgWgAApgRQgBgTgKgKQgKgKgQAAQgQAAgMAKQgMALgDASIBQAAIAAAAg");
	this.shape_172.setTransform(728.425,476.45);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_173.setTransform(715.325,476.375);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#01192C").s().p("AguBEQgQgNgBgWQAAgzBbAAIAGAAIAAgDQABghgiAAQgWAAgTAPIgMgVQAWgTAiABQAdAAAPAPQAPAQAAAcIAABfIgbAAIAAgPIABgLIgBAAQgMAdgjAAQgVAAgOgLgAghAgQAAAKAHAHQAIAHAOAAQAQAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_174.setTransform(700.45,476.45);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#01192C").s().p("AAkBMIgghhIgDgQIgBAAIgEAQIgeBhIghAAIgxiXIAfAAIAfBqIAFAQIAAAAIAEgQIAhhqIAaAAIAhBqIADAQIABAAIAEgQIAfhqIAfAAIgxCXg");
	this.shape_175.setTransform(680.85,476.45);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_176.setTransform(663.275,474.425);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#01192C").s().p("AgYBrIAAh+IgTAAIAAgXIATAAIAAgHQAAghAWgOQANgKAWAAIALABIAAAZIgIAAQggAAABAfIAAAHIAjAAIAAAXIgjAAIAAB+g");
	this.shape_177.setTransform(653.45,473.375);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAiAAQAjAAAXAWQAYAWAAAiQAAAigYAXQgXAXgjgBQgiABgXgXgAgkgmQgPAPAAAXQAAAYAPAPQAQAPAUAAQAWAAAPgPQAPgPAAgYQAAgXgPgPQgPgPgWAAQgUAAgQAPg");
	this.shape_178.setTransform(638.55,476.45);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#01192C").s().p("Ag3A6IAOgWQARATAZgBQAKAAAIgEQAIgGAAgJQAAgIgNgHIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgMAWABQAiAAAPAQIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAJAMAHIAaALQASAIAJAHQAMALAAARQAAAUgPAMQgPAMgZAAQgkAAgUgVg");
	this.shape_179.setTransform(622.475,476.45);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#01192C").s().p("Ag4BhIAJgXQATAKAXAAQAVAAAMgKQAOgLAAgWIAAgLIABgJIgBAAQgPAXgdAAQgfAAgTgWQgSgWAAggQAAgiARgUQATgWAeAAQAkAAALAWIAAAAIAAgEIAAgPIAcAAIAACRQAAAjgXASQgWAQgeAAQgbAAgZgMgAgehFQgKANAAAXQAAAYALAOQAMAOAUAAQAoAAAAgzQgBgzgqAAQgTAAgLAOg");
	this.shape_180.setTransform(598.75,479.425);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_181.setTransform(581.475,476.275);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_182.setTransform(568.575,473.45);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_183.setTransform(559.475,474.425);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_184.setTransform(550.425,473.45);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_185.setTransform(537.225,473.625);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#01192C").s().p("AgwA5QgWgXAAgiQAAgiAWgXQAVgWAgABQAfgBASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaABATgTIAMAWQgWAWglgBQgiAAgXgWgAApgRQgBgTgKgKQgKgKgQAAQgQAAgMAKQgMALgDASIBQAAIAAAAg");
	this.shape_186.setTransform(520.375,476.45);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAiAAQAjAAAXAWQAYAWAAAiQAAAigYAXQgXAXgjgBQgiABgXgXgAgkgmQgPAPAAAXQAAAYAPAPQAQAPAUAAQAWAAAPgPQAPgPAAgYQAAgXgPgPQgPgPgWAAQgUAAgQAPg");
	this.shape_187.setTransform(495,476.45);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#01192C").s().p("AgwA5QgWgXAAgiQAAgiAWgXQAVgWAgABQAfgBASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaABATgTIAMAWQgWAWglgBQgiAAgXgWgAApgRQgBgTgKgKQgKgKgQAAQgQAAgMAKQgMALgDASIBQAAIAAAAg");
	this.shape_188.setTransform(477.325,476.45);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_189.setTransform(459.525,473.625);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_190.setTransform(447.275,473.45);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#01192C").s().p("AgQBMIg4iXIAfAAIAlBmQADAIABANIAAAAQADgNADgIIAlhmIAeAAIg4CXg");
	this.shape_191.setTransform(436.025,476.45);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#01192C").s().p("AAEB8Qghg6AAhHQAAg/Ahg4IAaAAQghA5AAA/QAABDAhA9g");
	this.shape_192.setTransform(424.65,474.45);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#01192C").s().p("AgwA5QgWgXAAgiQAAgiAWgXQAVgWAgABQAfgBASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaABATgTIAMAWQgWAWglgBQgiAAgXgWgAApgRQgBgTgKgKQgKgKgQAAQgQAAgMAKQgMALgDASIBQAAIAAAAg");
	this.shape_193.setTransform(403.425,476.45);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#01192C").s().p("AgYBAIAAipIAcAAIAACkQAAAVAQABIAFAAIAAAZIgJAAQgoAAAAgqg");
	this.shape_194.setTransform(391.825,473.5);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#01192C").s().p("AhHBsIAAjTIAaAAIAAANIAAALIAAAAQANgcAmAAQAeAAASAWQASAWAAAkQAAAjgUAWQgSAVgeAAQghAAgNgYIgBAAIABANIAABEgAgdhEQgOAOAAAbQAAAWALAPQAMARAUAAQARAAANgPQAMgOAAgZQABgYgMgPQgMgPgTAAQgSAAgLANg");
	this.shape_195.setTransform(378.7,479.275);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_196.setTransform(355.625,476.275);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#01192C").s().p("AguBEQgRgNABgWQAAgzBaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAQAQAAAcIAABfIgcAAIAAgPIABgLIgBAAQgLAdgkAAQgVAAgOgLgAghAgQAAAKAHAHQAIAHANAAQARAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_197.setTransform(333.4,476.45);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#01192C").s().p("AAlBMIgggzIgFgIIAAAAIgEAIIggAzIghAAIA0hNIgxhKIAhAAIAdAuIAEAJIAAAAIAFgJIAdguIAhAAIgxBKIA0BNg");
	this.shape_198.setTransform(318.425,476.45);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#01192C").s().p("Ag/BqIAAjTIB6AAIAAAaIhcAAIAABDIBKAAIAAAYIhKAAIAABEIBhAAIAAAag");
	this.shape_199.setTransform(302.95,473.45);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#F2F2F2").s().p("AgSAUIAAgnIAlAAIAAAng");
	this.shape_200.setTransform(1141.875,392.85);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#F2F2F2").s().p("AAuCbIhChoIggAAIAABoIgrAAIAAk1IArAAIAACpIAfAAIA8hRIAwAAIhKBhIAAABIBTB7g");
	this.shape_201.setTransform(1126.875,379.275);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_202.setTransform(1102.075,383.675);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#F2F2F2").s().p("AhiAdIAAiOIAqAAIAACEQAAAbAHAMQAKAQAZAAQAgAAAUgaQATgXAAgiIAAhoIArAAIAADeIgqAAIAAgeIABgQIgBAAQgHATgVAOQgYASgdAAQhMAAABhVg");
	this.shape_203.setTransform(1076.6,383.95);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_204.setTransform(1055.675,380.675);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#F2F2F2").s().p("AhSBUIAVgeQAZAaAmAAQAOAAALgHQAMgIAAgNQAAgNgSgLIgngRQgagLgMgLQgSgRAAgYQgBgeAYgRQAXgRAhAAQAxAAAXAZIgRAgQgVgUgiAAQgPAAgJAHQgMAHAAAOQAAANASAKIAmAQQAaALANALQATARgBAZQAAAcgWASQgWATgkAAQg2AAgeghg");
	this.shape_205.setTransform(1037.95,383.675);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_206.setTransform(1008.925,380.675);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_207.setTransform(988.9,383.675);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#F2F2F2").s().p("AhTCOIAOgiQAcAPAhAAQAfAAASgOQAVgQAAggIAAgRIAAgOIgBAAQgVAjgsAAQgtAAgcghQgagfAAgxQAAgxAZgeQAbggAtAAQA1AAAQAhIABAAIgBgHIAAgVIApAAIAADVQAAAzgjAbQgeAXguAAQgoAAgkgSgAgshmQgQATAAAiQAAAjARAVQASAVAdAAQA6AAAAhLQAAhLg+AAQgcAAgQAUg");
	this.shape_208.setTransform(962.975,388.025);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#F2F2F2").s().p("AhiAdIAAiOIAqAAIAACEQAAAbAHAMQAKAQAZAAQAfAAAVgaQATgXAAgiIAAhoIArAAIAADeIgqAAIAAgeIACgQIgCAAQgHATgVAOQgXASgeAAQhLAAAAhVg");
	this.shape_209.setTransform(926.05,383.95);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_210.setTransform(899.325,383.675);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAJAOAAQAaABAOghIALgZIhdjcIAwAAIA3CSQAFALADAPIABAAIAHgZIA2iTIAuAAIhoEGQgUA0gzAAQgZAAgSgNg");
	this.shape_211.setTransform(874.325,388.3);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#F2F2F2").s().p("AgjCdIAAi5IgcAAIAAgiIAcAAIAAgLQAAgwAfgVQAUgOAgABQAJgBAHACIAAAkIgLgBQgvABAAAuIAAAKIA1AAIAAAiIg1AAIAAC5g");
	this.shape_212.setTransform(845.275,379.15);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIApAAIAADdgAgUhvIAAgrIApAAIAAArg");
	this.shape_213.setTransform(831.65,379.275);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#F2F2F2").s().p("AhjAdIAAiOIArAAIAACEQAAAbAIAMQAJAQAZAAQAfAAAVgaQATgXAAgiIAAhoIAqAAIAADeIgoAAIAAgeIABgQIgBAAQgJATgTAOQgYASgdAAQhNAAAAhVg");
	this.shape_214.setTransform(801.6,383.95);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_215.setTransform(774.875,383.675);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAJAOAAQAaABAOghIALgZIhdjcIAwAAIA3CSQAFALADAPIABAAIAHgZIA2iTIAuAAIhoEGQgUA0gzAAQgZAAgSgNg");
	this.shape_216.setTransform(749.875,388.3);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#F2F2F2").s().p("AhpCeIAAk2IAnAAIAAAUIAAAPIAAAAQATgoA3AAQAtAAAaAgQAbAhAAA0QAAAzgdAgQgcAhgsAAQgwAAgTglIgBAAIABATIAABkgAgshlQgTAWAAAoQAAAgAQAVQARAZAdAAQAbAAASgVQATgVAAglQAAgkgSgWQgRgWgcAAQgbABgRASg");
	this.shape_217.setTransform(714.975,387.8);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#F2F2F2").s().p("AgkBeIAAj5IAqAAIAADxQAAAgAYAAIAHAAIAAAmIgOAAQg7AAAAg+g");
	this.shape_218.setTransform(696.15,379.35);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_219.setTransform(677.2,383.675);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#F2F2F2").s().p("AA6CbIAAiFQAAgagIgMQgKgRgYAAQgYAAgUAQQgTAPgHAXQgDAMAAASIAABoIgrAAIAAk1IArAAIAAByIgBASIABAAQAIgTAUgOQAYgRAdAAQBNAAAABVIAACOg");
	this.shape_220.setTransform(651.925,379.275);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_221.setTransform(613.475,383.675);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_222.setTransform(591.825,380.675);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_223.setTransform(560.5,383.675);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#F2F2F2").s().p("AgkBeIAAj5IAqAAIAADxQAAAgAYAAIAHAAIAAAmIgOAAQg7AAAAg+g");
	this.shape_224.setTransform(543.4,379.35);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#F2F2F2").s().p("AhAB3IgBAAIABARIAAARIgpAAIAAk2IArAAIAABlIgBAUIABAAQATgnAzAAQAtAAAaAhQAbAgAAAzQAAA1gdAgQgcAggsAAQgxAAgUgngAgsgSQgTAUAAAoQAAAgAPAWQASAZAdAAQAbAAASgUQATgXAAglQAAgjgSgVQgRgWgcAAQgbAAgRATg");
	this.shape_225.setTransform(524.175,379.55);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_226.setTransform(497.925,383.675);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgZAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_227.setTransform(463.55,383.675);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#F2F2F2").s().p("AhAB3IgBAAIABARIAAARIgpAAIAAk2IArAAIAABlIgBAUIABAAQATgnAzAAQAtAAAaAhQAbAgAAAzQAAA1gdAgQgcAggsAAQgxAAgUgngAgsgSQgTAUAAAoQAAAgAPAWQASAZAdAAQAbAAASgUQATgXAAglQAAgjgSgVQgRgWgcAAQgbAAgRATg");
	this.shape_228.setTransform(438.875,379.55);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_229.setTransform(405.725,380.675);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAQQgTAOgHAYQgDANAAARIAABoIgrAAIAAjeIAqAAIAAAeIgBAQIABAAQAIgTATgNQAYgTAfAAQBNAAAABVIAACOg");
	this.shape_230.setTransform(384.825,383.4);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_231.setTransform(357.675,383.675);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#F2F2F2").s().p("AA1BvIgviOIgGgYIAAAAIgFAYIguCOIgwAAIhIjdIAuAAIAuCbQADALADAMIAAAAIAHgXIAvibIAnAAIAwCbIAGAXIABAAQABgMAEgLIAuibIAtAAIhHDdg");
	this.shape_232.setTransform(326.05,383.675);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_233.setTransform(284.65,383.675);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#F2F2F2").s().p("AA1BvIguiOIgGgYIgBAAIgGAYIgtCOIgvAAIhIjdIAtAAIAuCbQADALADAMIABAAIAFgXIAxibIAmAAIAwCbIAGAXIABAAQACgMADgLIAvibIAtAAIhIDdg");
	this.shape_234.setTransform(254.55,383.675);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#F2F2F2").s().p("AhPB+QgaghAAg0QAAg0AcgfQAcggAsgBQAzAAASAkIAAAAIAAgPIAAhnIAqAAIAAE2IgpAAIAAgWIABgOIgBAAQgSApg2AAQgtAAgbgggAgrgQQgSAUgBAlQABAkARAWQASAWAbAAQAbAAARgTQAUgVgBgoQAAghgPgVQgRgZgeAAQgbAAgSAWg");
	this.shape_235.setTransform(211.45,379.55);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAQQgTAOgHAYQgDANAAARIAABoIgrAAIAAjeIAqAAIAAAeIgBAQIABAAQAIgTATgNQAYgTAfAAQBNAAAABVIAACOg");
	this.shape_236.setTransform(185.875,383.4);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_237.setTransform(160.125,383.675);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#F2F2F2").s().p("AgjCdIAAi5IgcAAIAAgiIAcAAIAAgLQAAgwAfgUQAUgPAgAAQAJABAHABIAAAkIgLgBQgvABAAAuIAAAKIA1AAIAAAiIg1AAIAAC5g");
	this.shape_238.setTransform(1202.825,324.35);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAmIgOAAQg7AAAAg/g");
	this.shape_239.setTransform(1189.8,324.55);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQggAgg2AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_240.setTransform(1170.85,328.875);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#F2F2F2").s().p("AhSBUIAVgeQAZAaAmAAQAPAAAKgHQAMgIAAgNQAAgNgSgLIgngRQgagLgNgLQgRgRgBgYQAAgeAYgRQAXgRAhAAQAxAAAXAZIgSAgQgUgUgiAAQgPAAgKAHQgLAHAAAOQAAANASAKIAmAQQAbALAMALQATARAAAZQAAAcgXASQgWATgkAAQg2AAgeghg");
	this.shape_241.setTransform(1148.75,328.875);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_242.setTransform(1131.925,328.725);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#F2F2F2").s().p("AhjAdIAAiOIArAAIAACEQAAAbAIAMQAJAQAZAAQAgAAAUgaQATgXAAgiIAAhoIAqAAIAADeIgoAAIAAgeIAAgQIAAAAQgJATgTAOQgZASgcAAQhNAAAAhVg");
	this.shape_243.setTransform(1109.15,329.15);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_244.setTransform(1082.425,328.875);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOgBQAaABAOghIALgZIhdjbIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_245.setTransform(1057.425,333.5);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_246.setTransform(1027.075,325.875);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIAqAAIAADdgAgVhvIAAgrIArAAIAAArg");
	this.shape_247.setTransform(1013.75,324.475);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQACAjAXAUQAUATAfAAQAmAAAcgaIARAfQggAgg2AAQgzAAghgigAA8gZQgBgcgPgPQgPgOgXAAQgXAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_248.setTransform(984.8,328.875);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_249.setTransform(960.725,328.875);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAQgHAXQgDANAAARIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABVIAACOg");
	this.shape_250.setTransform(935.475,328.6);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_251.setTransform(909.725,328.875);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAQgHAXQgDANAAARIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABVIAACOg");
	this.shape_252.setTransform(885.775,328.6);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIAqAAIAADdgAgUhvIAAgrIAqAAIAAArg");
	this.shape_253.setTransform(866.85,324.475);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#F2F2F2").s().p("AgjCdIAAi5IgcAAIAAgiIAcAAIAAgLQAAgwAfgUQAUgPAgAAQAJABAHABIAAAkIgLgBQgvABAAAuIAAAKIA1AAIAAAiIg1AAIAAC5g");
	this.shape_254.setTransform(854.775,324.35);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_255.setTransform(821.625,328.875);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_256.setTransform(799.975,325.875);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgZAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_257.setTransform(768.65,328.875);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#F2F2F2").s().p("AgXBvIhUjdIAuAAIA2CVQAEAMADASIAAAAQAEgSAEgMIA2iVIAtAAIhSDdg");
	this.shape_258.setTransform(745.45,328.875);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_259.setTransform(722.075,328.875);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#F2F2F2").s().p("AA6CbIAAiFQAAgagIgMQgKgRgYAAQgYAAgUAQQgTAPgHAXQgDAMAAASIAABoIgrAAIAAk1IArAAIAAByIgBASIABAAQAIgTAUgOQAYgRAdAAQBNAAAABVIAACOg");
	this.shape_260.setTransform(698.125,324.475);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOgBQAaABAOghIALgZIhdjbIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_261.setTransform(662.125,333.5);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_262.setTransform(638.675,328.875);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#F2F2F2").s().p("AB+ByIAAiFQAAgbgHgMQgJgRgXAAQgXABgRAQQgQAQgHAZQgDANAAARIAABlIgpAAIAAiFQAAgagHgMQgJgSgXAAQgYAAgRASQgQAQgHAaQgDAKAAASIAABlIgqAAIAAjdIApAAIAAAdIgBAQIABAAQAIgUAVgPQAXgQAZAAQA2AAAMAzIAAAAQAKgVAVgOQAXgQAaAAQBJAAAABVIAACOg");
	this.shape_263.setTransform(607.875,328.6);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#F2F2F2").s().p("AhjAdIAAiOIArAAIAACEQAAAbAIAMQAJAQAZAAQAfAAAVgaQATgXAAgiIAAhoIAqAAIAADeIgoAAIAAgeIABgQIgBAAQgIATgVAOQgXASgeAAQhLAAgBhVg");
	this.shape_264.setTransform(563,329.15);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_265.setTransform(536.275,328.875);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOgBQAaABAOghIALgZIhdjbIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_266.setTransform(511.275,333.5);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#F2F2F2").s().p("AgUCbIAAk1IApAAIAAE1g");
	this.shape_267.setTransform(482.45,324.475);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#F2F2F2").s().p("AhpCbIAAk1IBsAAQAoAAAYAUQAaAWAAAlQAAAvgnAUIAAABQAYAHAOAUQAOAUAAAbQAAAqgeAYQgbAWgrAAgAg+B1IBGAAQAZAAAOgOQAOgOAAgYQAAgYgPgPQgOgPgYAAIhGAAgAg+gYIBBAAQAUAAANgNQAMgNAAgVQAAgVgMgMQgMgNgWAAIhAAAg");
	this.shape_268.setTransform(463,324.475);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOgBQAaABAOghIALgZIhdjbIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_269.setTransform(425.625,333.5);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#F2F2F2").s().p("AhAB3IgBAAIABARIAAARIgpAAIAAk2IArAAIAABmIgBATIABAAQATgnAzAAQAtAAAaAhQAbAgAAAzQAAA1gdAgQgcAggsAAQgxAAgUgngAgsgSQgTAUAAAoQAAAgAPAXQASAYAdAAQAbABASgWQATgWAAglQAAgjgSgVQgRgWgcAAQgbAAgRATg");
	this.shape_270.setTransform(402.025,324.75);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#F2F2F2").s().p("AhOB+QgbghAAg0QAAg0AcggQAcgfAsgBQAzAAASAkIABAAIgBgPIAAhnIAqAAIAAE2IgpAAIAAgWIABgOIgBAAQgSApg2AAQgtAAgagggAgqgQQgUAVABAkQAAAkARAWQASAWAbAAQAbAAARgTQAUgWAAgnQAAghgQgVQgRgYgeAAQgbgBgRAWg");
	this.shape_271.setTransform(362.9,324.75);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgWAAQgZAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_272.setTransform(338.2,328.875);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_273.setTransform(318.075,325.875);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_274.setTransform(303.225,328.725);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_275.setTransform(280.025,328.875);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#F2F2F2").s().p("AhpCeIAAk1IAnAAIAAATIAAAPIAAAAQATgoA3AAQAtAAAaAhQAbAfAAA1QAAAzgdAgQgcAhgsAAQgwAAgTglIgBAAIABATIAABkgAgshlQgTAWAAAnQAAAgAQAWQARAZAdAAQAbAAASgVQATgVAAglQAAgkgSgWQgRgWgcAAQgbABgRASg");
	this.shape_276.setTransform(253.825,333);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#F2F2F2").s().p("AhpCeIAAk1IAnAAIAAATIAAAPIAAAAQATgoA3AAQAtAAAaAhQAbAfAAA1QAAAzgdAgQgcAhgsAAQgwAAgTglIgBAAIABATIAABkgAgshlQgTAWAAAnQAAAgAQAWQARAZAdAAQAbAAASgVQATgVAAglQAAgkgSgWQgRgWgcAAQgbABgRASg");
	this.shape_277.setTransform(227.425,333);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#F2F2F2").s().p("AhiAdIAAiOIAqAAIAACEQAAAbAHAMQAKAQAZAAQAfAAAVgaQATgXAAgiIAAhoIAqAAIAADeIgpAAIAAgeIACgQIgCAAQgHATgVAOQgXASgeAAQhLAAAAhVg");
	this.shape_278.setTransform(200.2,329.15);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#F2F2F2").s().p("AhSBUIAVgeQAZAaAmAAQAOAAAMgHQALgIAAgNQAAgNgSgLIgngRQgagLgNgLQgRgRgBgYQAAgeAYgRQAXgRAhAAQAxAAAWAZIgRAgQgTgUgkAAQgOAAgKAHQgLAHAAAOQAAANASAKIAmAQQAbALANALQASARAAAZQAAAcgXASQgWATgkAAQg1AAgfghg");
	this.shape_279.setTransform(177.3,328.875);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_280.setTransform(148.275,325.875);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_281.setTransform(126.725,328.875);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAQgHAXQgDANAAARIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABVIAACOg");
	this.shape_282.setTransform(99.925,328.6);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAlIgOABQg7AAAAg/g");
	this.shape_283.setTransform(1199.45,269.75);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_284.setTransform(1178.975,274.075);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_285.setTransform(1151.525,274.075);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_286.setTransform(1129.875,271.075);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_287.setTransform(1098.425,274.075);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_288.setTransform(1064.05,274.075);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#F2F2F2").s().p("AhSBUIAVgeQAZAaAmAAQAPAAALgHQALgIAAgNQAAgNgSgLIgmgRQgbgLgNgLQgSgRAAgYQABgeAXgRQAWgRAiAAQAxAAAWAZIgRAgQgTgUgkAAQgOAAgKAHQgLAHAAAOQAAANASAKIAmAQQAbALANALQARARABAZQAAAcgXASQgWATgkAAQg1AAgfghg");
	this.shape_289.setTransform(1041.95,274.075);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_290.setTransform(1018.425,274.075);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_291.setTransform(990.975,274.075);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#F2F2F2").s().p("AA6CbIAAiFQAAgagIgMQgKgRgYAAQgYAAgUAQQgTAPgHAXQgDAMAAASIAABoIgrAAIAAk1IArAAIAAByIgBASIABAAQAIgTAUgOQAYgRAdAAQBNAAAABVIAACOg");
	this.shape_292.setTransform(964.175,269.675);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_293.setTransform(938.875,274.075);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#F2F2F2").s().p("AhiAcIAAiNIAqAAIAACEQAAAbAHAMQAKAQAZAAQAfAAAVgaQATgYAAghIAAhoIArAAIAADeIgqAAIAAgeIABgQIgBAAQgHATgVAPQgYARgdAAQhLAAAAhWg");
	this.shape_294.setTransform(902.1,274.35);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_295.setTransform(875.375,274.075);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOAAQAaAAAOghIALgaIhdjaIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_296.setTransform(850.375,278.7);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#F2F2F2").s().p("AgjCdIAAi5IgcAAIAAgiIAcAAIAAgLQAAgwAfgUQAUgOAggBQAJABAHABIAAAkIgLgBQgvABAAAuIAAAKIA1AAIAAAiIg1AAIAAC5g");
	this.shape_297.setTransform(821.325,269.55);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIApAAIAADdgAgUhvIAAgrIApAAIAAArg");
	this.shape_298.setTransform(807.7,269.675);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#F2F2F2").s().p("AgiAtIAbhZIAqAAIgjBZg");
	this.shape_299.setTransform(784.475,285.125);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_300.setTransform(772.725,273.925);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQABAjAYAUQAUATAeAAQAnAAAcgaIARAfQghAgg1AAQgzAAghgigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_301.setTransform(751.05,274.075);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#F2F2F2").s().p("AgYBvIhSjdIAtAAIA2CVQAEAMADASIABAAQADgSAFgMIA2iVIAtAAIhTDdg");
	this.shape_302.setTransform(727.85,274.075);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAcgaIARAfQggAgg2AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_303.setTransform(704.6,274.075);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#F2F2F2").s().p("AA1BvIguiOIgHgYIAAAAIgGAYIgtCOIgvAAIhIjdIAtAAIAuCbQAEALACAMIABAAIAFgXIAxibIAmAAIAwCbIAGAXIABAAQACgMADgLIAuibIAtAAIhHDdg");
	this.shape_304.setTransform(674.5,274.075);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_305.setTransform(642.875,274.075);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#F2F2F2").s().p("ABRCbIAAiIIihAAIAACIIgrAAIAAk1IArAAIAACIIChAAIAAiIIArAAIAAE1g");
	this.shape_306.setTransform(612.55,269.675);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#F2F2F2").s().p("AgVAXIAAgtIAsAAIAAAtg");
	this.shape_307.setTransform(579.05,282.925);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAXAUQAUATAeAAQAnAAAcgaIARAfQggAgg2AAQgzAAghgigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_308.setTransform(561.25,274.075);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_309.setTransform(537.175,274.075);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAQgHAXQgDAMAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_310.setTransform(511.925,273.8);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAYAUQAUATAfAAQAmAAAbgaIASAfQggAgg2AAQgzAAghgigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_311.setTransform(486.3,274.075);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_312.setTransform(467.075,273.925);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAcgaIARAfQggAgg2AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_313.setTransform(445.4,274.075);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#F2F2F2").s().p("AgjCdIAAi5IgcAAIAAgiIAcAAIAAgLQAAgwAfgUQAUgOAggBQAJABAHABIAAAkIgLgBQgvABAAAuIAAAKIA1AAIAAAiIg1AAIAAC5g");
	this.shape_314.setTransform(426.575,269.55);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAcgaIARAfQggAgg2AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_315.setTransform(406.25,274.075);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_316.setTransform(387.025,273.925);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#F2F2F2").s().p("AhpCeIAAk1IAnAAIAAATIAAAQIAAAAQATgpA3AAQAtAAAaAhQAbAfAAA0QAAA0gdAgQgcAhgsAAQgwAAgTglIgBAAIABATIAABkgAgshlQgTAWAAAnQAAAgAQAWQARAZAdAAQAbAAASgVQATgVAAglQAAgkgSgWQgRgVgcgBQgbABgRASg");
	this.shape_317.setTransform(365.075,278.2);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAQgHAXQgDAMAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_318.setTransform(326.775,273.8);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#F2F2F2").s().p("AA1BvIguiOIgHgYIAAAAIgFAYIguCOIgwAAIhIjdIAuAAIAuCbQADALACAMIABAAIAHgXIAvibIAnAAIAwCbIAGAXIABAAQABgMAEgLIAuibIAtAAIhHDdg");
	this.shape_319.setTransform(295.45,274.075);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_320.setTransform(263.825,274.075);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_321.setTransform(231.775,273.925);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#F2F2F2").s().p("AhiAcIAAiNIAqAAIAACEQAAAbAHAMQAKAQAZAAQAgAAAUgaQATgYAAghIAAhoIArAAIAADeIgqAAIAAgeIABgQIgBAAQgHATgVAPQgYARgdAAQhMAAABhWg");
	this.shape_322.setTransform(209,274.35);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_323.setTransform(182.275,274.075);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#F2F2F2").s().p("AhsCQIAPghQAMAKAOAAQAaAAAOghIALgaIhdjaIAwAAIA3CRQAFALADAPIABAAIAHgZIA2iSIAuAAIhoEFQgUA1gzAAQgZAAgSgOg");
	this.shape_324.setTransform(157.275,278.7);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_325.setTransform(121.125,274.075);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_326.setTransform(99.475,271.075);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#F2F2F2").s().p("AhTCOIAOgiQAcAPAhAAQAfAAASgOQAVgQAAggIAAgRIAAgOIgBAAQgVAjgsAAQgtAAgcghQgagfAAgxQAAgxAZgeQAbggAtAAQA1AAAQAhIABAAIgBgHIAAgVIApAAIAADVQAAAzgjAbQgeAXguAAQgoAAgkgSgAgshmQgQATAAAiQAAAjARAVQASAVAdAAQA6AAAAhLQAAhLg+AAQgcAAgQAUg");
	this.shape_327.setTransform(1223.525,223.625);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAPgHAZQgDALAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_328.setTransform(1198.125,219);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIApAAIAADdgAgVhvIAAgrIAqAAIAAArg");
	this.shape_329.setTransform(1179.2,214.875);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#F2F2F2").s().p("AhOB9QgbgfAAg1QAAgzAcghQAcgfAsAAQAzgBASAkIABAAIgBgPIAAhnIAqAAIAAE1IgoAAIAAgUIAAgPIgBAAQgSApg2AAQgtAAgaghgAgqgRQgUAVABAlQAAAkARAWQASAWAbAAQAbAAARgTQAUgWAAgnQAAgggQgWQgRgZgeABQgbAAgRAUg");
	this.shape_330.setTransform(1159.85,215.15);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_331.setTransform(1140.325,219.125);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_332.setTransform(1117.125,219.275);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_333.setTransform(1091.525,219.275);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_334.setTransform(1067.475,219.275);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_335.setTransform(1042.975,219.275);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#F2F2F2").s().p("AhRBUIAUgeQAZAaAmAAQAOAAAMgHQALgIAAgNQAAgNgSgLIgmgRQgbgLgNgLQgSgRAAgYQABgeAXgRQAWgRAiAAQAxAAAWAZIgRAgQgTgUgkAAQgOAAgKAHQgLAHAAAOQAAANASAKIAmAQQAbALANALQARARABAZQAAAcgXASQgWATgkAAQg2AAgdghg");
	this.shape_336.setTransform(1010.9,219.275);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAlIgOABQg7AAAAg/g");
	this.shape_337.setTransform(996.2,214.95);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_338.setTransform(977.125,219.275);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIAqAAIAADdgAgVhvIAAgrIArAAIAAArg");
	this.shape_339.setTransform(960.75,214.875);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_340.setTransform(948.275,219.125);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgZAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_341.setTransform(926.6,219.275);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_342.setTransform(906.475,216.275);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_343.setTransform(886.325,219.275);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#F2F2F2").s().p("AB+ByIAAiEQAAgbgHgNQgJgQgXgBQgXAAgRARQgQARgHAYQgDANAAAQIAABmIgpAAIAAiEQAAgagHgNQgJgRgXgBQgYABgRARQgQAQgHAZQgDALAAARIAABmIgqAAIAAjdIApAAIAAAdIgBAQIABAAQAIgUAVgPQAXgQAZAAQA2AAAMAzIAAAAQAKgVAVgOQAXgQAaAAQBJAAAABWIAACNg");
	this.shape_344.setTransform(855.525,219);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#F2F2F2").s().p("AhTCOIAOgiQAcAPAhAAQAfAAASgOQAVgQAAggIAAgRIAAgOIgBAAQgVAjgsAAQgtAAgcghQgagfAAgxQAAgxAZgeQAbggAtAAQA1AAAQAhIABAAIgBgHIAAgVIApAAIAADVQAAAzgjAbQgeAXguAAQgoAAgkgSgAgshmQgQATAAAiQAAAjARAVQASAVAdAAQA6AAAAhLQAAhLg+AAQgcAAgQAUg");
	this.shape_345.setTransform(810.225,223.625);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAPgHAZQgDALAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_346.setTransform(784.825,219);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#F2F2F2").s().p("AgUCbIAAjdIAqAAIAADdgAgVhvIAAgrIArAAIAAArg");
	this.shape_347.setTransform(765.9,214.875);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAPgHAZQgDALAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_348.setTransform(747.375,219);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#F2F2F2").s().p("Ag8BxIAAjeIApAAIAAAnIgBARIABAAQAIgaARgQQAUgRAYAAIALABIAAArQgFgCgHAAQgVAAgRAOQgQAOgHAZQgGARAAAWIAABbg");
	this.shape_349.setTransform(726.925,219.125);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_350.setTransform(705.125,219.275);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAYAUQAUATAfAAQAmAAAbgaIASAfQggAgg2AAQgzAAghgigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_351.setTransform(682.05,219.275);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAlIgOABQg7AAAAg/g");
	this.shape_352.setTransform(664.95,214.95);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#F2F2F2").s().p("AhpCeIAAk1IAnAAIAAATIAAAQIAAAAQATgpA3AAQAtAAAaAhQAbAfAAA0QAAA0gdAhQgcAfgsAAQgwAAgTgkIgBAAIABATIAABkgAgshlQgTAVAAAoQAAAhAQAVQARAZAdAAQAbAAASgVQATgVAAglQAAgkgSgWQgRgVgcgBQgbAAgRATg");
	this.shape_353.setTransform(634.425,223.4);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_354.setTransform(606.775,219.275);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAlIgOABQg7AAAAg/g");
	this.shape_355.setTransform(588.15,214.95);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAXAUQAVATAfAAQAmAAAbgaIASAfQghAgg1AAQgzAAgigigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_356.setTransform(569.2,219.275);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#F2F2F2").s().p("AgYBvIhTjdIAuAAIA2CVQAEAMADASIAAAAQAEgSAEgMIA2iVIAtAAIhSDdg");
	this.shape_357.setTransform(546,219.275);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgzAgghQAfggAwAAQAtAAAaAfQAZAcAAAuIgCARIihAAQABAjAYAUQAUATAfAAQAmAAAcgaIARAfQggAgg2AAQgzAAghgigAA8gZQgBgcgPgPQgPgOgWAAQgYAAgSAPQgSAPgFAbIB2AAIAAAAg");
	this.shape_358.setTransform(522.75,219.275);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#F2F2F2").s().p("AhPB9QgagfAAg1QAAgzAcghQAcgfAsAAQAzgBASAkIABAAIgBgPIAAhnIAqAAIAAE1IgpAAIAAgUIABgPIgBAAQgSApg2AAQgtAAgbghgAgrgRQgSAVAAAlQAAAkARAWQASAWAbAAQAbAAARgTQAUgWAAgnQAAgggQgWQgSgZgdABQgbAAgSAUg");
	this.shape_359.setTransform(496.65,215.15);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_360.setTransform(459.125,219.275);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_361.setTransform(437.475,216.275);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#F2F2F2").s().p("AhRBUIAUgeQAZAaAmAAQAPAAALgHQALgIAAgNQAAgNgSgLIgmgRQgbgLgNgLQgSgRAAgYQAAgeAYgRQAWgRAiAAQAxAAAWAZIgRAgQgTgUgkAAQgOAAgJAHQgMAHAAAOQAAANASAKIAmAQQAaALANALQASARAAAZQAAAcgVASQgXATgkAAQg1AAgeghg");
	this.shape_362.setTransform(408.45,219.275);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#F2F2F2").s().p("AgkBdIAAj4IAqAAIAADxQAAAgAYAAIAHAAIAAAlIgOABQg7AAAAg/g");
	this.shape_363.setTransform(393.75,214.95);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_364.setTransform(373.275,219.275);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_365.setTransform(345.825,219.275);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#F2F2F2").s().p("AgDCBQgfgUAAgxIAAhnIgeAAIAAgiIAfAAIAAhBIAoAAIAABBIA2AAIAAAiIg2AAIAABiQAAAyAwAAIAKgBIAAAmIgPABQggAAgVgOg");
	this.shape_366.setTransform(324.175,216.275);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#F2F2F2").s().p("AhHBTQggghAAgyQAAgzAgghQAfggAvAAQAuAAAaAfQAZAcAAAuIgBARIiiAAQACAjAWAUQAVATAeAAQAnAAAcgaIARAfQggAgg2AAQgzAAgigigAA8gZQgBgcgQgPQgOgOgXAAQgYAAgRAPQgSAPgEAbIB1AAIAAAAg");
	this.shape_367.setTransform(292.85,219.275);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#F2F2F2").s().p("AhRBUIAUgeQAZAaAmAAQAPAAALgHQALgIAAgNQAAgNgSgLIgmgRQgbgLgNgLQgSgRAAgYQAAgeAYgRQAWgRAiAAQAxAAAWAZIgRAgQgTgUgkAAQgOAAgJAHQgMAHAAAOQAAANASAKIAmAQQAaALANALQASARABAZQgBAcgVASQgXATgkAAQg1AAgeghg");
	this.shape_368.setTransform(270.75,219.275);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#F2F2F2").s().p("AhjAcIAAiNIArAAIAACDQAAAbAIANQAJAQAZAAQAfAAAVgaQATgXAAgiIAAhoIAqAAIAADdIgoAAIAAgdIABgQIgBAAQgJATgTAPQgYARgdAAQhNAAAAhWg");
	this.shape_369.setTransform(247.65,219.55);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#F2F2F2").s().p("AA6ByIAAiEQAAgbgIgNQgKgQgYAAQgYAAgUAPQgTAPgHAZQgDALAAASIAABoIgrAAIAAjdIAqAAIAAAdIgBAQIABAAQAIgTATgOQAYgSAfAAQBNAAAABWIAACNg");
	this.shape_370.setTransform(210.275,219);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#F2F2F2").s().p("AhFBjQgXgTAAgfQAAhMCFAAIAJAAIAAgEQAAgxgwAAQgiAAgbAWIgSgfQAggbAyAAQArAAAWAXQAXAWAAArIAACLIgnAAIAAgVIABgRIgBAAQgSAsg1AAQgfAAgVgSgAgxAvQAAAOAKAKQAMALAUAAQAYAAASgXQAQgVAAgbIAAgHIgLAAQhZAAAAArg");
	this.shape_371.setTransform(184.525,219.275);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#F2F2F2").s().p("AhGBTQghghAAgyQAAgxAhghQAigiAzAAQA4AAAcAhIgVAeQgXgagmAAQghAAgWAXQgWAWAAAiQAAAiAWAWQAXAYAhAAQAqAAAbgeIARAfQgfAkg6AAQgzAAgigig");
	this.shape_372.setTransform(161.775,219.275);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#F2F2F2").s().p("AhjAcIAAiNIArAAIAACDQAAAbAIANQAJAQAZAAQAgAAAUgaQATgXAAgiIAAhoIAqAAIAADdIgoAAIAAgdIAAgQIAAAAQgJATgTAPQgZARgcAAQhNAAAAhWg");
	this.shape_373.setTransform(125,219.55);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#F2F2F2").s().p("AhUBTQgjghAAgyQAAgyAjghQAjghAxAAQAyAAAjAhQAjAhAAAyQAAAygjAhQgjAigyAAQgxAAgjgigAg1g4QgWAWAAAiQAAAiAWAXQAWAXAfAAQAgAAAWgXQAXgXAAgiQAAgigXgWQgWgXggAAQgfAAgWAXg");
	this.shape_374.setTransform(98.275,219.275);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#F2F2F2").s().p("AgUCbIAAiDIhpiyIAyAAIA5BmQAKARAIAWIABAAQAJgWAKgRIA5hmIAxAAIhoCyIAACDg");
	this.shape_375.setTransform(71.625,214.875);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#F2F2F2").s().p("Ag2A3IAAhtIBtAAIAABtg");
	this.shape_376.setTransform(841.55,164.15);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#F2F2F2").s().p("ACXCwIAAjLQAAgrgbgBQgzAAgNBCQgDALAAAcIAACOIhyAAIAAjLQAAgrgbgBQgyAAgNA/QgDAPAAAbIAACOIh0AAIAAlXIBvAAIAAAdIgBAWIABAAQAog8A/ABQBEAAAbA5IACAAQAPgXAbgQQAggSAkAAQBwAAAACAIAADfg");
	this.shape_377.setTransform(801.65,152);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#F2F2F2").s().p("Ah4B9QgxgzABhKQAAhNAvgyQAyg0BRAAQBLgBArAwQApAuABBJQAAALgDAYIjZAAQAHAfAWAQQAWAPAcAAQAyAAAugjIAqBRQg3AzhcAAQhXAAg1g4gAA1gqQAAgVgNgPQgNgPgTAAQgsAAgLAzIBkAAIAAAAg");
	this.shape_378.setTransform(751.7,152.4);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#F2F2F2").s().p("AgnDbQgpgeAAhPIAAleIBzAAIAAFPQAAAZAGAJQAHAKATAAIAOAAIAABkQgQACgTAAQg5AAgcgWg");
	this.shape_379.setTransform(723.275,145.875);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#F2F2F2").s().p("AhIDNIgBAAIAAATIAAALIhsAAIAAndIBzAAIAACFIgBAdIABAAQAhgkA8AAQBGAAArAxQAqAzAABQQAABQguAyQgtAyhGAAQg+gBgfgmgAgwABQgVAWAAAqQAAAiARAXQASAaAhAAQAbAAATgWQAVgWAAgnQAAgmgTgYQgTgVgdAAQgdgBgSAUg");
	this.shape_380.setTransform(691.225,146.1);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#F2F2F2").s().p("AiKCDQg5gyAAhQQAAhPA5g0QA4gxBSAAQBSAAA4AxQA5A0ABBPQgBBQg5AyQg3AyhTAAQhSAAg4gygAg2g8QgXAYAAAlQAAAlAXAYQAXAWAfAAQAhAAAWgWQAYgYAAglQAAglgYgYQgWgXghAAQgfAAgXAXg");
	this.shape_381.setTransform(647.4,152.4);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#F2F2F2").s().p("Ah0CvIAAlXIBvAAIAAA5IgBAWIABAAQAKgkAegYQAfgaAmABIANABIAAByQgJgCgOAAQhGgBgTA9QgGASAAAcIAACCg");
	this.shape_382.setTransform(613.325,152.1);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#F2F2F2").s().p("Ai1D0IAAneIBoAAIAAARIgBAWIABAAQAggwBIABQBGAAArAxQAqAzAABRQAABPguAyQgtAyhGAAQg3AAgggiIgBAAIABAeIAACCgAgwh8QgVAWAAAqQAAAiARAXQASAZAhAAQAbAAATgWQAVgVAAgnQAAgmgTgYQgTgWgdAAQgdgBgSAVg");
	this.shape_383.setTransform(577.175,158.7);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#F2F2F2").s().p("AiKCDQg4gyAAhQQAAhPA4g0QA4gxBSAAQBTAAA3AxQA5A0AABPQAABQg5AyQg3AyhTAAQhSAAg4gygAg2g8QgXAYAAAlQAAAlAXAYQAXAWAfAAQAhAAAWgWQAXgYAAglQAAglgXgYQgWgXghAAQgfAAgXAXg");
	this.shape_384.setTransform(518.05,152.4);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#F2F2F2").s().p("ABUDvIiEjfQgTgegVgzIgCAAQAGA1AAAcIAADfIh1AAIAAndIB2AAICEDgQASAdAWAzIABAAQgFg0AAgcIAAjgIB1AAIAAHdg");
	this.shape_385.setTransform(470.925,145.7);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#01192C").s().p("AgOAQIAAgfIAdAAIAAAfg");
	this.shape_386.setTransform(913.575,517.1);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_387.setTransform(883.425,511.05);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_388.setTransform(855.525,511.05);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgLAWAAQAiAAAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMAMAAARQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_389.setTransform(815.025,511.05);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAYgXAhABQAjgBAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQghgBgYgWgAgjgmQgQAQAAAWQAAAYAQAPQAPAQAUAAQAWAAAPgQQAPgPABgYQgBgWgPgQQgPgPgWAAQgUAAgPAPg");
	this.shape_390.setTransform(780.95,511.05);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgWQAYgYAiABQAngBASAXIgNAUQgQgRgbAAQgWAAgOAPQgQAQAAAWQAAAXAQAPQAPAQAWABQAdAAASgVIAMAVQgVAZgoAAQgjgBgXgWg");
	this.shape_391.setTransform(763.5,511.05);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiABQAjgBAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQgigBgXgWgAgkgmQgPAQAAAWQAAAYAPAPQAPAQAVAAQAWAAAPgQQAPgPAAgYQAAgWgPgQQgPgPgWAAQgVAAgPAPg");
	this.shape_392.setTransform(730.25,511.05);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiABQAjgBAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQgigBgXgWgAgjgmQgQAQAAAWQAAAYAQAPQAOAQAVAAQAWAAAPgQQAPgPAAgYQAAgWgPgQQgPgPgWAAQgVAAgOAPg");
	this.shape_393.setTransform(711.55,511.05);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#01192C").s().p("AAkBMIgghhIgDgQIgBAAIgEAQIgeBhIghAAIgxiXIAfAAIAgBpIADARIABAAIAEgRIAhhpIAZAAIAiBpIADARIABAAIAEgRIAfhpIAfAAIgxCXg");
	this.shape_394.setTransform(671.6,511.05);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_395.setTransform(651.075,511.05);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#01192C").s().p("AgvBEQgPgNAAgVQAAg0BaAAIAHAAIAAgDQgBghggAAQgXAAgTAPIgMgWQAWgRAhAAQAdAAAQAPQAQAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_396.setTransform(608.6,511.05);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_397.setTransform(585.175,511.05);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgWQAWgRAiAAQAcAAAQAPQAPAPAAAdIAABfIgbAAIAAgOIACgNIgCAAQgLAfgkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_398.setTransform(553.4,511.05);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAPQgDAJAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_399.setTransform(537.125,508.05);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiABQAigBAYAXQAYAXAAAhQAAAigYAXQgYAWgiABQgigBgXgWgAgkgmQgPAQAAAWQAAAYAPAPQAPAQAVAAQAWAAAPgQQAPgPAAgYQAAgWgPgQQgPgPgWAAQgVAAgPAPg");
	this.shape_400.setTransform(510.9,511.05);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgLAWAAQAiAAAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMAMAAARQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_401.setTransform(465.725,511.05);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_402.setTransform(450.725,511.05);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#01192C").s().p("AhDAUIAAhhIAdAAIAABaQAAASAGAJQAGALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIAAgLIAAAAQgGANgNAKQgQAMgUAAQg0AAAAg6g");
	this.shape_403.setTransform(433.35,511.225);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#01192C").s().p("AArBsIAAhFIABgOIgBAAQgMAagjAAQgfAAgSgWQgSgWAAgiQAAgkATgWQATgWAeAAQAiAAANAaIABAAIAAgLIAAgLIAbAAIAADTgAgdhDQgNAPAAAZQAAAYAMAOQAMAPASAAQATAAAMgNQANgNAAgbQAAgWgLgQQgLgQgVAAQgSAAgMAOg");
	this.shape_404.setTransform(415.025,513.875);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#01192C").s().p("AgwA4QgWgWAAgiQAAgiAWgXQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAagBATgRIAMAVQgWAVglABQgiAAgXgYgAApgQQgBgUgKgKQgKgKgQABQgQAAgMAKQgMAKgDATIBQAAIAAAAg");
	this.shape_405.setTransform(398.175,511.05);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgXAiABQAigBAYAXQAYAWAAAiQAAAigYAXQgYAWgiAAQgiAAgXgWgAgkgmQgPAPAAAXQAAAYAPAPQAPAQAVAAQAWAAAPgQQAPgPAAgYQAAgXgPgPQgPgPgWAAQgVAAgPAPg");
	this.shape_406.setTransform(1195.35,473.05);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#01192C").s().p("AAnBqIAAhaQAAgSgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_407.setTransform(1114.175,470.05);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#01192C").s().p("AAfBqIgshIIgWAAIAABIIgdAAIAAjTIAdAAIAABzIAVAAIAog3IAhAAIgyBCIAAABIA4BUg");
	this.shape_408.setTransform(1090.375,470.05);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgXQAYgWAjAAQAmgBASAXIgNAUQgRgRgaAAQgWAAgOAPQgPAPgBAXQABAXAPAQQAPAQAWAAQAcgBATgUIAMAWQgVAYgngBQgkAAgXgWg");
	this.shape_409.setTransform(1073.45,473.05);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_410.setTransform(1054.425,470.1);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#01192C").s().p("AgvA5QgXgWAAgjQAAghAXgXQAXgWAiAAQAngBASAXIgNAUQgQgRgbAAQgWAAgPAPQgPAPAAAXQAAAXAPAQQAQAQAWAAQAdgBASgUIAMAWQgVAYgogBQgjAAgWgWg");
	this.shape_411.setTransform(1041.7,473.05);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_412.setTransform(1017.375,473.05);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_413.setTransform(1002.325,473.05);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#01192C").s().p("AguBEQgRgNABgWQAAgzBaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAPAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgLAegkAAQgVABgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_414.setTransform(987.25,473.05);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_415.setTransform(971.525,473.05);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_416.setTransform(959.925,470.1);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#01192C").s().p("AhHBqIAAjTIBMAAQAdAAATATQATASAAAeQAAAdgTASQgTASgdAAIgvAAIAABPgAgqACIAqAAQATAAALgLQAMgLAAgSQAAgUgMgKQgLgLgTAAIgqAAg");
	this.shape_417.setTransform(947.2,470.05);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#01192C").s().p("AgOAQIAAgfIAdAAIAAAfg");
	this.shape_418.setTransform(925.625,479.1);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgXAhABQAjgBAXAXQAYAWAAAiQAAAigYAXQgXAWgjAAQghAAgYgWgAgjgmQgQAPAAAXQAAAYAQAPQAPAQAUAAQAWAAAPgQQAQgPAAgYQAAgXgQgPQgPgPgWAAQgUAAgPAPg");
	this.shape_419.setTransform(912.45,473.05);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_420.setTransform(892.375,470.1);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgXAiABQAjgBAXAXQAYAWAAAiQAAAigYAXQgXAWgjAAQgiAAgXgWgAgkgmQgPAPAAAXQAAAYAPAPQAQAQAUAAQAWAAAPgQQAPgPAAgYQAAgXgPgPQgPgPgWAAQgUAAgQAPg");
	this.shape_421.setTransform(878.4,473.05);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#01192C").s().p("AgXBrIAAh+IgTAAIAAgXIATAAIAAgHQAAghAUgOQAOgKAVAAIALABIAAAZIgHAAQgfAAgBAfIAAAHIAkAAIAAAXIgkAAIAAB+g");
	this.shape_422.setTransform(864.55,469.975);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgXAiABQAigBAYAXQAYAWAAAiQAAAigYAXQgYAWgiAAQgiAAgXgWgAgkgmQgPAPAAAXQAAAYAPAPQAPAQAVAAQAWAAAPgQQAQgPAAgYQAAgXgQgPQgPgPgWAAQgVAAgPAPg");
	this.shape_423.setTransform(827.7,473.05);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#01192C").s().p("AhHBsIAAjTIAbAAIAAANIgBALIABAAQANgcAkAAQAfAAASAWQASAWAAAkQAAAjgTAWQgUAVgeAAQggAAgNgYIAAAAIAAANIAABEgAgehEQgNAOAAAbQAAAWALAPQAMARAUAAQASAAAMgPQANgOAAgZQAAgYgNgPQgLgPgTAAQgSAAgMANg");
	this.shape_424.setTransform(809.85,475.875);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#01192C").s().p("Ag5BhIALgXQASAKAXAAQAUAAANgKQAOgLAAgWIAAgLIABgJIgCAAQgNAXgfAAQgeAAgTgWQgSgWAAggQAAgiASgUQARgWAfAAQAkAAALAWIABAAIgBgEIAAgPIAcAAIAACRQAAAjgYASQgUAQggAAQgbAAgZgMgAgehFQgLANAAAXQAAAYAMAOQAMAOATAAQApAAAAgzQAAgzgrAAQgTAAgLAOg");
	this.shape_425.setTransform(783.3,476.025);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_426.setTransform(744.025,471.025);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_427.setTransform(731.975,473.05);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_428.setTransform(694.325,473.05);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_429.setTransform(669.975,473.05);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#01192C").s().p("AAnBqIAAhaQAAgSgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_430.setTransform(652.775,470.05);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_431.setTransform(638.225,471.025);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#01192C").s().p("AAnBqIAAhaQAAgSgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_432.setTransform(590.825,470.05);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_433.setTransform(576.275,471.025);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#01192C").s().p("AAkBMIgfhhIgFgQIAAAAIgDAQIggBhIggAAIgxiXIAfAAIAfBqIAEAQIABAAIAEgQIAhhqIAaAAIAgBqIAFAQIAAAAIADgQIAhhqIAeAAIgxCXg");
	this.shape_434.setTransform(551.3,473.05);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_435.setTransform(524.675,473.05);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_436.setTransform(509.675,473.05);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_437.setTransform(473.475,471.025);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#01192C").s().p("AguBEQgRgNABgWQAAgzBaAAIAHAAIAAgDQgBghghAAQgWAAgTAPIgMgVQAWgTAhABQAeAAAPAPQAQAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgMAegkAAQgVABgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_438.setTransform(459.75,473.05);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_439.setTransform(429.525,472.975);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_440.setTransform(414.725,473.05);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_441.setTransform(401.025,471.025);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_442.setTransform(392.425,470.1);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#01192C").s().p("AguBEQgQgNgBgWQAAgzBbAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAeAAAPAPQAPAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgMAegjAAQgVABgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_443.setTransform(379.4,473.05);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#01192C").s().p("AhJBjIAKgXQAIAGAKABQASgBAJgWIAHgSIg/iUIAhAAIAmBjIAEASIABAAIAFgRIAlhkIAfAAIhHCyQgNAjgjABQgRgBgMgIg");
	this.shape_444.setTransform(356.575,476.2);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#01192C").s().p("AgvBEQgQgNAAgWQAAgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAiABQAcAAAQAPQAPAQAAAcIAABfIgbAAIAAgPIACgMIgCAAQgLAegkAAQgVABgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_445.setTransform(322.55,473.05);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_446.setTransform(302.675,472.975);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_447.setTransform(287.875,473.05);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_448.setTransform(247.375,473.05);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgXAiABQAjgBAXAXQAYAWAAAiQAAAigYAXQgXAWgjAAQgiAAgXgWgAgkgmQgPAPAAAXQAAAYAPAPQAQAQAUAAQAWAAAPgQQAPgPAAgYQAAgXgPgPQgPgPgWAAQgUAAgQAPg");
	this.shape_449.setTransform(213.3,473.05);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAghAWgXQAYgWAjAAQAmgBASAXIgNAUQgRgRgZAAQgXAAgOAPQgPAPgBAXQABAXAPAQQAPAQAWAAQAcgBATgUIAMAWQgVAYgngBQgkAAgXgWg");
	this.shape_450.setTransform(195.85,473.05);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_451.setTransform(171.525,473.05);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_452.setTransform(156.475,473.05);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#01192C").s().p("AgvBEQgPgNAAgWQgBgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAQAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgNAegjAAQgVABgPgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_453.setTransform(141.4,473.05);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#01192C").s().p("AgwA5QgWgWAAgjQAAgjAWgWQAVgVAgAAQAfAAASAUQARAUAAAfIgBALIhuAAQABAYAQAOQAOANAUAAQAaAAATgSIAMAVQgWAVglAAQgiABgXgXgAApgQQgBgUgKgKQgKgKgQAAQgQABgMAJQgMALgDATIBQAAIAAAAg");
	this.shape_454.setTransform(125.675,473.05);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_455.setTransform(114.075,470.1);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#01192C").s().p("AhHBqIAAjTIBMAAQAeAAASATQATASAAAeQAAAdgTASQgSASgeAAIguAAIAABPgAgpACIAqAAQASAAAMgLQALgLgBgSQABgUgLgKQgMgLgSAAIgqAAg");
	this.shape_456.setTransform(101.35,470.05);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#F2F2F2").s().p("Ag6A7IAAh1IB1AAIAAB1g");
	this.shape_457.setTransform(1011.1,378.25);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#F2F2F2").s().p("AiVDPQgug1AAhXQAAhWAwg2QAvg1BLAAQBJAAAXAeIABAAIAAgRIAAiUIB8AAIAAICIh0AAIAAgZIAAgVIgBAAQgfA3hLAAQhMAAgug3gAgwABQgVAZAAApQAAApAUAaQAUAZAfAAQAfAAAUgWQAWgZAAgtQAAgkgSgZQgUgagjAAQgdAAgVAVg");
	this.shape_458.setTransform(976.8,358.875);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_459.setTransform(934.825,365.625);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#F2F2F2").s().p("AiVCLIA1hTQApAlA2AAQAjAAAAgRQAAgKgbgMIg6gXQhXgoAAhHQAAg0AsgfQArgeBAAAQBXAAAsAqIgrBZQgkgfg0AAQgjAAAAATQAAAIAaAKIA7AXQBXAmAABIQAAAxgoAhQgqAjhFAAQhcAAg4g3g");
	this.shape_460.setTransform(897.475,365.625);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#F2F2F2").s().p("Ai3AyIAAjvIB9AAIAADZQAAAwAoAAQAlAAAVgdQATgdAAgqIAAilIB8AAIAAFyIh3AAIAAghQAAgMACgKIgCAAQgPAdgfASQgfARglAAQiFAAAAiMg");
	this.shape_461.setTransform(857.8,366.05);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_462.setTransform(798.575,365.625);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#F2F2F2").s().p("AhNDcIgCAAIABAUIAAANIh1AAIAAoCIB9AAIAACPQAAATgCANIACAAQAjgoBAAAQBLAAAuA2QAuA2AABWQAABXgxA1QgxA2hLAAQhDAAghgqgAgzAAQgXAZAAAtQAAAkASAZQAUAcAjAAQAeAAAUgYQAWgYAAgpQAAgqgVgZQgTgXggAAQgfAAgTAUg");
	this.shape_463.setTransform(756.725,358.875);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#F2F2F2").s().p("AA9C+IAAjZQAAgxgpAAQg3AAgSA2QgHAUAAAcIAACkIh9AAIAAlyIB4AAIAAAgQAAANgBAKIABAAQAmhABPAAQCGAAAACLIAADwg");
	this.shape_464.setTransform(693.5,365.175);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#F2F2F2").s().p("AiGCiQglgiAAg1QAAhHBVgdQA4gUBJAAIAFAAIAAgGQAAgqg2AAQgvAAg1AkIgrhYQBAgwBaAAQBOAAAtAoQAtAoAABHIAADjIhyAAIAAgWIABgXIgBAAQgcA2hMAAQg2AAgjgggAgSAjQgcALAAAWQAAAfAjAAQAXAAASgWQAUgUgBgYIAAgIIgLAAQgjAAgVAKg");
	this.shape_465.setTransform(649.1,365.625);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#F2F2F2").s().p("AiACHQg2g3AAhQQAAhPA1g3QA6g7BfAAQBlAAAuA4Ig0BTQgkgjgzAAQgpAAgYAbQgXAZAAAkQAAAjAXAaQAaAeArAAQA0AAAygsIAtBXQg4A9hnAAQhfAAg5g7g");
	this.shape_466.setTransform(610.55,365.625);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#F2F2F2").s().p("AgODVQhBgiAAhTIAAiAIgwAAIAAhhIA0AAIAAhrIB4AAIAABrIBNAAIAABhIhNAAIAABwQAAAvBCABIARgBIAABsQgOACgUAAQhCAAgqgYg");
	this.shape_467.setTransform(558.55,360.8);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_468.setTransform(533.275,358.425);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_469.setTransform(485.675,365.625);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#F2F2F2").s().p("Ah9C8IAAlyIB3AAIAAA/QABAMgCAMIABAAQAMgoAggaQAhgbAoAAIAPACIAAB6QgKgCgPAAQhKAAgWBAQgFAVAAAdIAACMg");
	this.shape_470.setTransform(451.75,365.3);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#F2F2F2").s().p("AiUCNQg9g3AAhVQAAhVA9g3QA8g2BYAAQBZAAA8A2QA9A3AABVQAABVg9A3Qg8A1hZAAQhYAAg8g1gAg6hBQgZAaAAAoQAAAoAZAZQAYAYAiAAQAkAAAXgYQAZgZAAgoQAAgogZgaQgYgYgjAAQgiAAgYAYg");
	this.shape_471.setTransform(411.675,365.625);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#F2F2F2").s().p("AhQEDIAAkKIgtAAIAAhhIAtAAIAAgQQAAhQA/gjQApgXBBAAQAWAAAPACIAABpIgUgBQg/AAAAAkIAAAMIBFAAIAABhIhFAAIAAEKg");
	this.shape_472.setTransform(376.225,358.275);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_473.setTransform(340.875,365.625);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#F2F2F2").s().p("AhNDcIgCAAIABAUIAAANIh1AAIAAoCIB9AAIAACPQAAATgCANIACAAQAjgoBAAAQBLAAAuA2QAuA2AABWQAABXgxA1QgxA2hLAAQhDAAghgqgAgzAAQgXAZAAAtQAAAkASAZQAUAcAjAAQAeAAAUgYQAWgYAAgpQAAgqgVgZQgTgXggAAQgfAAgTAUg");
	this.shape_474.setTransform(299.025,358.875);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#F2F2F2").s().p("Ah9C8IAAlxIB4AAIAAA+QAAANgCAKIACAAQALgmAggbQAhgbApAAIAOABIAAB7QgKgCgPAAQhLAAgVBBQgFATgBAeIAACMg");
	this.shape_475.setTransform(1144.15,276.9);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_476.setTransform(1106.625,277.225);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#F2F2F2").s().p("AiVDPQgug1AAhXQAAhWAwg2QAvg1BKAAQBKAAAWAeIACAAIgBgRIAAiUIB9AAIAAICIh1AAIAAgZIABgVIgBAAQgfA3hMAAQhLAAgug3gAgvABQgWAZAAApQAAApAUAaQAUAZAgAAQAeAAAUgWQAWgZAAgtQAAgkgSgZQgUgagiAAQgeAAgUAVg");
	this.shape_477.setTransform(1062.25,270.475);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_478.setTransform(1029.775,270.025);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#F2F2F2").s().p("AhKC5IiAlxICDAAIA6DEQAHAXAGApIABAAQAHgoAGgYIA6jEICDAAIh+Fxg");
	this.shape_479.setTransform(998.65,277.2);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#F2F2F2").s().p("AiUCNQg9g3AAhVQAAhVA9g3QA8g2BYAAQBZAAA8A2QA9A3AABVQAABVg9A3Qg8A1hZAAQhYAAg8g1gAg6hBQgZAaAAAoQAAAoAZAZQAYAYAiAAQAkAAAXgYQAZgZAAgoQAAgogZgaQgYgYgjAAQgiAAgYAYg");
	this.shape_480.setTransform(955.625,277.225);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#F2F2F2").s().p("Ah9C8IAAlxIB4AAIAAA+QgBANgBAKIACAAQALgmAggbQAigbAnAAIAPABIAAB7QgKgCgPAAQhLAAgVBBQgGATAAAeIAACMg");
	this.shape_481.setTransform(919,276.9);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#F2F2F2").s().p("AjDEGIAAoCIBxAAIAAATQAAAMgCALIACAAQAigzBNAAQBLAAAuA2QAuA2AABXQAABWgxA1QgxA2hLAAQg7AAgigkIgCAAQACANAAATIAACLgAgziGQgXAZAAAtQAAAkASAZQAUAbAjAAQAeAAAUgYQAWgXAAgpQAAgqgVgZQgTgYggAAQgfAAgTAVg");
	this.shape_482.setTransform(880.125,283.975);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#F2F2F2").s().p("AiVCLIA1hTQApAlA2AAQAjAAAAgRQAAgKgbgMIg6gXQhXgoAAhHQAAg0AsgfQArgeBAAAQBXAAAsAqIgrBZQgkgfg0AAQgjAAAAATQAAAIAaAKIA7AXQBXAmAABIQAAAxgoAhQgqAjhFAAQhcAAg4g3g");
	this.shape_483.setTransform(822.325,277.225);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_484.setTransform(794.775,270.025);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#F2F2F2").s().p("AA9EBIAAjZQAAgwgpAAQg3AAgSA2QgHASAAAdIAACkIh9AAIAAoBIB9AAIAACiQAAATgCANIACAAQAig7BOAAQCGAAAACKIAADwg");
	this.shape_485.setTransform(761.35,270.025);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgwAAIAAhgIA0AAIAAhrIB4AAIAABrIBNAAIAABgIhNAAIAABxQAAAvBCAAIARAAIAABsQgOACgUAAQhCAAgqgXg");
	this.shape_486.setTransform(722.8,272.4);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#F2F2F2").s().p("AA9EBIAAjZQAAgwgpAAQg3AAgTA2QgGASAAAdIAACkIh8AAIAAoBIB8AAIAACiQAAATgCANIACAAQAig7BOAAQCFAAABCKIAADwg");
	this.shape_487.setTransform(669.3,270.025);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgvAAIAAhgIAzAAIAAhrIB4AAIAABrIBNAAIAABgIhNAAIAABxQAAAvBCAAIARAAIAABsQgOACgUAAQhCAAgqgXg");
	this.shape_488.setTransform(630.75,272.4);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_489.setTransform(605.475,270.025);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#F2F2F2").s().p("AAzC5IgrirQgFgTgCgTIgBAAQgCATgEATIgqCrIiNAAIhnlxICDAAIAuDZQAEAVABATIABAAQABgTAFgVIAzjZIBqAAIAzDZQAFAVABATIACAAQAAgTAEgVIAujZICCAAIhoFxg");
	this.shape_490.setTransform(564.45,277.2);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgvAAIAAhgIAzAAIAAhrIB4AAIAABrIBOAAIAABgIhOAAIAABxQAAAvBCAAIAQAAIAABsQgNACgUAAQhCAAgqgXg");
	this.shape_491.setTransform(502.35,272.4);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#F2F2F2").s().p("AA8C+IAAjZQAAgxgoAAQg3AAgRA2QgIAUAAAcIAACkIh8AAIAAlyIB3AAIAAAgQAAANgCAKIACAAQAnhABOAAQCGAAgBCLIAADwg");
	this.shape_492.setTransform(465.3,276.775);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_493.setTransform(421.825,277.225);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#F2F2F2").s().p("ACiC+IAAjbQAAgvgdAAQg2AAgNBGQgEAMAAAeIAACaIh8AAIAAjbQAAgvgcAAQg1AAgOBDQgFAQAAAdIAACaIh8AAIAAlyIB4AAIAAAgQgBANgBAKIACAAQAqhABDAAQBKAAAeA/IABAAQAQgaAegRQAigUAnAAQB4AAAACLIAADwg");
	this.shape_494.setTransform(368.9,276.775);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_495.setTransform(315.275,277.225);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_496.setTransform(274.775,277.225);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#F2F2F2").s().p("Ah9C8IAAlxIB4AAIAAA+QgBANgBAKIACAAQALgmAggbQAigbAoAAIAOABIAAB7QgKgCgPAAQhLAAgVBBQgGATAAAeIAACMg");
	this.shape_497.setTransform(240.85,276.9);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#F2F2F2").s().p("AicDoIAjheQAuAYA6AAQBVAAAAhIIAAgMIABgNIgCAAQggAmg7AAQhQAAgug5QgqgzAAhNQAAhMApgzQAug3BQAAQBCAAAhAkIACAAIAAgJIAAgTIB1AAIAAFRQAABdhDAyQg5AphVAAQhNAAg/ghgAgyiLQgQATAAAiQAAAlARAYQATAZAiAAQBDAAAAhRQAAhPhHAAQggAAgSAVg");
	this.shape_498.setTransform(199.825,284.325);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#F2F2F2").s().p("AiGCiQgmgiAAg1QABhHBVgdQA4gUBJAAIAFAAIAAgGQAAgqg2AAQguAAg2AkIgrhYQBAgwBaAAQBPAAAsAoQAtAoAABHIAADjIhyAAIAAgWIABgXIgBAAQgbA2hOAAQg1AAgjgggAgTAjQgbALAAAWQAAAfAjAAQAXAAASgWQATgUAAgYIAAgIIgLAAQgjAAgWAKg");
	this.shape_499.setTransform(157.15,277.225);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#F2F2F2").s().p("AA8C+IAAjZQAAgxgoAAQg2AAgTA2QgHAUAAAcIAACkIh8AAIAAlyIB3AAIAAAgQAAANgCAKIACAAQAnhABOAAQCGAAgBCLIAADwg");
	this.shape_500.setTransform(1180.8,188.375);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#F2F2F2").s().p("AiUCNQg9g3AAhVQAAhVA9g3QA8g2BYAAQBZAAA8A2QA9A3AABVQAABVg9A3Qg8A1hZAAQhYAAg8g1gAg6hBQgZAaAAAoQAAAoAZAZQAYAYAiAAQAkAAAXgYQAZgZAAgoQAAgogZgaQgYgYgjAAQgiAAgYAYg");
	this.shape_501.setTransform(1134.775,188.825);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_502.setTransform(1101.075,181.625);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgwAAIAAhhIA0AAIAAhqIB4AAIAABqIBOAAIAABhIhOAAIAABxQAAAwBCgBIAQAAIAABsQgNACgUAAQhCAAgqgXg");
	this.shape_503.setTransform(1074.85,184);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#F2F2F2").s().p("AiACHQg2g3AAhQQAAhPA2g3QA5g7BfAAQBlAAAuA4Ig0BTQgkgjgzAAQgpAAgZAbQgVAZAAAkQgBAjAXAaQAaAeArAAQA0AAAygsIAtBXQg3A9hoAAQhfAAg5g7g");
	this.shape_504.setTransform(1040.9,188.825);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_505.setTransform(1000.425,188.825);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgvAAIAAhhIAzAAIAAhqIB4AAIAABqIBOAAIAABhIhOAAIAABxQAAAwBCgBIAQAAIAABsQgNACgUAAQhCAAgqgXg");
	this.shape_506.setTransform(964.85,184);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#F2F2F2").s().p("AiUCNQg9g3AAhVQAAhVA9g3QA8g2BYAAQBZAAA8A2QA9A3AABVQAABVg9A3Qg8A1hZAAQhYAAg8g1gAg6hBQgZAaAAAoQAAAoAZAZQAYAYAiAAQAkAAAXgYQAZgZAAgoQAAgogZgaQgYgYgjAAQgiAAgYAYg");
	this.shape_507.setTransform(927.525,188.825);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#F2F2F2").s().p("Ah9C9IAAlyIB4AAIAAA+QAAAMgCALIACAAQALgnAggaQAigaAogBIAOABIAAB7QgKgCgPAAQhKAAgWBBQgFATgBAeIAACNg");
	this.shape_508.setTransform(890.9,188.5);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#F2F2F2").s().p("AjDEGIAAoCIBxAAIAAATQAAAMgCALIACAAQAigzBNAAQBLAAAuA2QAuA2AABXQAABWgxA1QgxA2hLAAQg7AAgigkIgCAAQACANAAATIAACLgAgziGQgXAZAAAtQAAAkASAZQAUAbAjAAQAeAAAUgYQAWgXAAgpQAAgqgVgZQgTgYggAAQgfAAgTAVg");
	this.shape_509.setTransform(852.025,195.575);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#F2F2F2").s().p("AiGCiQgmgiABg1QAAhHBVgdQA4gUBJAAIAFAAIAAgGQAAgqg2AAQgvAAg1AkIgrhYQBAgwBbAAQBNAAAtAoQAsAoAABHIAADjIhxAAIAAgWIABgXIgBAAQgbA2hNAAQg2AAgjgggAgSAjQgcALAAAWQAAAfAjAAQAXAAASgWQAUgUgBgYIAAgIIgMAAQgiAAgVAKg");
	this.shape_510.setTransform(790.15,188.825);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#F2F2F2").s().p("AgODWQhBgkAAhRIAAiCIgvAAIAAhhIAzAAIAAhqIB4AAIAABqIBOAAIAABhIhOAAIAABxQAAAwBCgBIAQAAIAABsQgNACgUAAQhCAAgqgXg");
	this.shape_511.setTransform(755.7,184);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#F2F2F2").s().p("AiHCiQgkgigBg1QAAhHBXgdQA3gUBJAAIAFAAIAAgGQAAgqg2AAQguAAg2AkIgrhYQBAgwBaAAQBPAAAsAoQAsAoABBHIAADjIhyAAIAAgWIABgXIgBAAQgcA2hNAAQg1AAgkgggAgTAjQgbALAAAWQAAAfAjAAQAWAAAUgWQASgUABgYIAAgIIgMAAQgjAAgWAKg");
	this.shape_512.setTransform(720,188.825);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#F2F2F2").s().p("AiVDPQgug1AAhXQAAhWAwg2QAvg1BKAAQBLAAAWAeIABAAIAAgRIAAiUIB8AAIAAICIh0AAIAAgZIAAgVIgBAAQgfA3hLAAQhMAAgug3gAgvABQgWAZAAApQAAApAUAaQAUAZAfAAQAfAAAUgWQAWgZAAgtQAAgkgSgZQgUgagjAAQgdAAgUAVg");
	this.shape_513.setTransform(676.75,182.075);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#F2F2F2").s().p("AiHCiQgkgigBg1QAAhHBXgdQA3gUBJAAIAFAAIAAgGQAAgqg2AAQguAAg2AkIgrhYQBAgwBaAAQBPAAAsAoQAtAoAABHIAADjIhyAAIAAgWIABgXIgBAAQgbA2hOAAQg1AAgkgggAgTAjQgbALAAAWQAAAfAjAAQAWAAAUgWQASgUAAgYIAAgIIgLAAQgjAAgWAKg");
	this.shape_514.setTransform(617.4,188.825);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_515.setTransform(561.575,188.825);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#F2F2F2").s().p("Ah9C9IAAlyIB4AAIAAA+QAAAMgCALIACAAQALgnAggaQAhgaApgBIAOABIAAB7QgKgCgPAAQhLAAgVBBQgFATgBAeIAACNg");
	this.shape_516.setTransform(527.65,188.5);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_517.setTransform(499.625,181.625);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#F2F2F2").s().p("Ai3AzIAAjwIB9AAIAADYQAAAyAoAAQAlAAAVgfQATgbAAgsIAAikIB8AAIAAFyIh3AAIAAggQAAgMACgMIgCAAQgPAegfARQggASgkAAQiFAAAAiLg");
	this.shape_518.setTransform(465.85,189.25);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#F2F2F2").s().p("ABHEGIAAiSQABgSABgNIgCAAQggAqhDAAQhLAAgug3Qgug1AAhWQAAhXAwg2QAvg1BKAAQBLAAAeAoIACAAQgBgIgBgMIAAgLIB1AAIAAICgAgviFQgWAZAAApQAAApAUAaQAUAYAgAAQAeAAAUgWQAWgYAAgtQAAgkgSgZQgUgbgiAAQgeAAgUAWg");
	this.shape_519.setTransform(419.2,195.575);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#F2F2F2").s().p("AiBCGQg0g3AAhPQAAhTAzg2QA2g4BXAAQBQAAAvAzQAsAxAABPQAAAMgDAaIjpAAQAHAgAZASQAWAQAgAAQA1AAAxglIAuBXQg8A2hjAAQhdAAg5g8gAA5guQAAgWgOgPQgOgRgVAAQguAAgNA2IBsAAIAAAAg");
	this.shape_520.setTransform(377.225,188.825);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#F2F2F2").s().p("Ah9C9IAAlyIB3AAIAAA+QABAMgCALIABAAQAMgnAggaQAhgaAogBIAPABIAAB7QgKgCgPAAQhKAAgWBBQgFATAAAeIAACNg");
	this.shape_521.setTransform(343.3,188.5);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#F2F2F2").s().p("AgrDsQgrghAAhUIAAl5IB7AAIAAFoQAAAcAIAJQAGAKAVAAIAPAAIAABsQgRACgUAAQg+AAgfgXg");
	this.shape_522.setTransform(299.2,181.8);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#F2F2F2").s().p("AgqDsQgsghAAhUIAAl5IB8AAIAAFoQgBAcAIAJQAHAKAUAAIAPAAIAABsQgRACgUAAQg+AAgegXg");
	this.shape_523.setTransform(275.95,181.8);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#F2F2F2").s().p("Ag9EBIAAlyIB7AAIAAFygAg8ifIAAhhIB5AAIAABhg");
	this.shape_524.setTransform(252.325,181.625);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#F2F2F2").s().p("AAzC6IgrirQgEgUgDgUIgBAAQgBAUgFAUIgqCrIiNAAIhnlyICDAAIAuDZQAEAUABATIABAAQABgTAFgUIAzjZIBqAAIAzDZQAFAUABATIACAAQAAgTAEgUIAujZICCAAIhoFyg");
	this.shape_525.setTransform(211.3,188.8);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#F2F2F2").s().p("Ag+EBIAAoBIB9AAIAAIBg");
	this.shape_526.setTransform(152.3,181.625);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#F2F2F2").s().p("AjAEBIAAoBIC+AAQBOAAAvAiQAwAjAABBQAAAigPAdQgQAegcARIAAABQApAMAVAjQATAeAAAmQAABPg8AoQg0AihTAAgAhCCVIBLAAQAaAAAPgQQAOgPAAgXQAAgXgOgOQgOgPgaAAIhMAAgAhCg5IBBAAQAsAAAAgwQAAgsguAAIg/AAg");
	this.shape_527.setTransform(117.875,181.625);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#01192C").s().p("AgOAPIAAgdIAdAAIAAAdg");
	this.shape_528.setTransform(1157.425,569.5);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAigBQAiABAYAWQAYAWAAAiQAAAigYAXQgYAXgiAAQgiAAgXgXgAgkgmQgPAPAAAXQAAAXAPAQQAPAPAVAAQAWAAAPgPQAPgQAAgXQAAgXgPgPQgPgPgWAAQgVAAgPAPg");
	this.shape_529.setTransform(1144.25,563.45);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAWAQgBIAFAAIAAAaIgJAAQgoAAAAgqg");
	this.shape_530.setTransform(1124.175,560.5);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgWAhgBQAiABAYAWQAYAWAAAiQAAAigYAXQgYAXgiAAQghAAgYgXgAgkgmQgPAPAAAXQAAAXAPAQQAQAPAUAAQAWAAAPgPQAQgQAAgXQAAgXgQgPQgPgPgWAAQgUAAgQAPg");
	this.shape_531.setTransform(1110.2,563.45);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#01192C").s().p("AgYBrIAAh+IgTAAIAAgXIATAAIAAgHQAAghAWgOQANgKAWAAIAKABIAAAZIgHAAQggAAABAfIAAAHIAjAAIAAAXIgjAAIAAB+g");
	this.shape_532.setTransform(1096.35,560.375);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgWAhgBQAjABAXAWQAYAWAAAiQAAAigYAXQgXAXgjAAQgiAAgXgXgAgjgmQgQAPAAAXQAAAXAQAQQAPAPAUAAQAWAAAPgPQAPgQABgXQgBgXgPgPQgPgPgWAAQgUAAgPAPg");
	this.shape_533.setTransform(1059.5,563.45);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#01192C").s().p("AhHBsIAAjTIAaAAIAAANIAAALIAAAAQANgcAlAAQAfAAASAWQASAWAAAkQAAAjgUAWQgSAVgeAAQghAAgNgYIAAAAIAAANIAABEgAgehEQgNAOAAAbQAAAWALAPQAMARAUAAQARAAANgPQAMgOAAgZQABgYgMgPQgMgPgTAAQgSAAgMANg");
	this.shape_534.setTransform(1041.65,566.275);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_535.setTransform(1016.125,563.45);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAPQgDAJAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAAMIAAAAQAGgMANgKQARgMATAAQA1AAAAA6IAABhg");
	this.shape_536.setTransform(998.925,560.45);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgWAhgBQAjABAXAWQAYAWAAAiQAAAigYAXQgXAXgjAAQghAAgYgXgAgjgmQgQAPAAAXQAAAXAQAQQAPAPAUAAQAWAAAPgPQAPgQABgXQgBgXgPgPQgPgPgWAAQgUAAgPAPg");
	this.shape_537.setTransform(951.95,563.45);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_538.setTransform(926.575,563.45);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#01192C").s().p("Ag3A5IAOgVQARASAZAAQAKAAAIgEQAIgGAAgJQAAgJgNgHIgZgLQgTgIgIgHQgNgLAAgRQAAgVARgLQAPgMAWAAQAiAAAPARIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAKAMAGIAaALQASAIAJAHQAMAMAAAQQAAATgPANQgPANgZAAQgkAAgUgXg");
	this.shape_539.setTransform(886.075,563.45);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIABgLIgBAAQgFANgOAKQgRAMgTAAQg0AAAAg6g");
	this.shape_540.setTransform(859.65,563.625);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgWAhgBQAiABAYAWQAYAWAAAiQAAAigYAXQgYAXgiAAQghAAgYgXgAgjgmQgQAPAAAXQAAAXAQAQQAPAPAUAAQAWAAAPgPQAQgQAAgXQAAgXgQgPQgPgPgWAAQgUAAgPAPg");
	this.shape_541.setTransform(841.45,563.45);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#01192C").s().p("Ag3A5IAOgVQARASAZAAQAKAAAIgEQAIgGAAgJQAAgJgNgHIgZgLQgTgIgIgHQgNgLAAgRQAAgVARgLQAPgMAWAAQAiAAAPARIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAKAMAGIAaALQASAIAJAHQAMAMAAAQQAAATgPANQgPANgZAAQgkAAgUgXg");
	this.shape_542.setTransform(817.675,563.45);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAWAQgBIAFAAIAAAaIgJAAQgoAAAAgqg");
	this.shape_543.setTransform(807.725,560.5);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgWAhgBQAiABAYAWQAYAWAAAiQAAAigYAXQgYAXgiAAQghAAgYgXgAgjgmQgQAPAAAXQAAAXAQAQQAPAPAUAAQAWAAAPgPQAQgQAAgXQAAgXgQgPQgPgPgWAAQgUAAgPAPg");
	this.shape_544.setTransform(793.75,563.45);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAigBQAiABAYAWQAYAWAAAiQAAAigYAXQgYAXgiAAQgiAAgXgXgAgkgmQgPAPAAAXQAAAXAPAQQAPAPAVAAQAWAAAPgPQAPgQAAgXQAAgXgPgPQgPgPgWAAQgVAAgPAPg");
	this.shape_545.setTransform(775.05,563.45);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#01192C").s().p("AhJBjIAKgXQAIAGAKAAQASABAJgXIAHgRIg/iWIAhAAIAmBkIAEARIABAAIAFgRIAlhkIAfAAIhHCyQgNAlgjgBQgRABgMgJg");
	this.shape_546.setTransform(739.575,566.6);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#01192C").s().p("AguBEQgRgNABgVQAAg0BaAAIAHAAIAAgCQAAgigiAAQgWAAgTAPIgMgWQAWgSAhAAQAdAAAQAQQAPAQAAAcIAABfIgaAAIAAgOIAAgMIAAAAQgMAegkAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_547.setTransform(705.55,563.45);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgWAigBQAjABAXAWQAYAWAAAiQAAAigYAXQgXAXgjAAQgiAAgXgXgAgjgmQgQAPAAAXQAAAXAQAQQAPAPAUAAQAWAAAPgPQAPgQABgXQgBgXgPgPQgPgPgWAAQgUAAgPAPg");
	this.shape_548.setTransform(663.05,563.45);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#01192C").s().p("AgdB9QAhg+AAhEQAAg+ghg5IAZAAQAiA4AAA/QAABHgiA7g");
	this.shape_549.setTransform(640.8,561.45);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#01192C").s().p("AgwA5QgWgXAAgiQAAghAWgWQAYgYAjAAQAmABASAWIgNAUQgRgRgaAAQgWAAgOAPQgPAPgBAXQABAXAPAPQAPAQAWAAQAcABATgVIAMAVQgVAZgnAAQgkAAgXgXg");
	this.shape_550.setTransform(628.85,563.45);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_551.setTransform(601.525,563.45);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#01192C").s().p("AgvBEQgPgNAAgVQAAg0BaAAIAHAAIAAgCQgBgiggAAQgXAAgTAPIgMgWQAWgSAhAAQAdAAAQAQQAQAQAAAcIAABfIgbAAIAAgOIABgMIgBAAQgMAegkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgPQALgPAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_552.setTransform(565.85,563.45);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_553.setTransform(550.125,563.45);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#01192C").s().p("AhHBsIAAjTIAbAAIAAANIgBALIABAAQANgcAlAAQAeAAASAWQASAWAAAkQAAAjgTAWQgUAVgeAAQggAAgNgYIgBAAIABANIAABEgAgdhEQgOAOAAAbQAAAWALAPQAMARAUAAQASAAAMgPQANgOAAgZQgBgYgMgPQgLgPgTAAQgSAAgLANg");
	this.shape_554.setTransform(533.3,566.275);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#01192C").s().p("AhHBsIAAjTIAbAAIAAANIgBALIABAAQANgcAlAAQAeAAASAWQASAWAAAkQAAAjgTAWQgUAVgeAAQggAAgNgYIgBAAIABANIAABEgAgdhEQgOAOAAAbQAAAWALAPQAMARAUAAQASAAAMgPQANgOAAgZQgBgYgMgPQgLgPgTAAQgSAAgLANg");
	this.shape_555.setTransform(515.3,566.275);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#01192C").s().p("AguBEQgQgNgBgVQAAg0BbAAIAHAAIAAgCQAAgigiAAQgWAAgTAPIgMgWQAWgSAiAAQAdAAAPAQQAPAQAAAcIAABfIgbAAIAAgOIABgMIgBAAQgMAegjAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_556.setTransform(497.4,563.45);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#01192C").s().p("Ag3A5IAOgVQARASAZAAQAKAAAIgEQAIgGAAgJQAAgJgNgHIgZgLQgTgIgIgHQgNgLAAgRQAAgVARgLQAPgMAWAAQAiAAAPARIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAKAMAGIAaALQASAIAJAHQAMAMAAAQQAAATgPANQgPANgZAAQgkAAgUgXg");
	this.shape_557.setTransform(475.575,563.45);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_558.setTransform(431.825,563.45);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#01192C").s().p("AhDAUIAAhhIAdAAIAABaQAAASAGAJQAGALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIABgLIgBAAQgGANgNAKQgQAMgUAAQg0AAAAg6g");
	this.shape_559.setTransform(396.45,563.625);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#01192C").s().p("Ag3A5IAOgVQARASAZAAQAKAAAIgEQAIgGAAgJQAAgJgNgHIgZgLQgTgIgIgHQgNgLAAgRQAAgVARgLQAPgMAWAAQAiAAAPARIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAKAMAGIAaALQASAIAJAHQAMAMAAAQQAAATgPANQgPANgZAAQgkAAgUgXg");
	this.shape_560.setTransform(370.175,563.45);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_561.setTransform(347.475,563.45);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_562.setTransform(319.575,563.45);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAPQgDAJAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAAMIAAAAQAGgMANgKQARgMATAAQA1AAAAA6IAABhg");
	this.shape_563.setTransform(302.375,560.45);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#01192C").s().p("AAkBMIgghgIgDgRIgBAAIgEARIgeBgIghAAIgxiXIAfAAIAgBpIADARIABAAIAEgRIAhhoIAZAAIAiBoIADARIABAAIAEgRIAfhpIAfAAIgxCXg");
	this.shape_564.setTransform(281,563.45);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#01192C").s().p("Ag3A5IAOgVQARASAZAAQAKAAAIgEQAIgGAAgJQAAgJgNgHIgZgLQgTgIgIgHQgNgLAAgRQAAgVARgLQAPgMAWAAQAiAAAPARIgLAXQgOgOgYAAQgJAAgHAEQgIAFAAAJQAAAKAMAGIAaALQASAIAJAHQAMAMAAAQQAAATgPANQgPANgZAAQgkAAgUgXg");
	this.shape_565.setTransform(254.375,563.45);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#01192C").s().p("AgYBAIAAiqIAcAAIAAClQAAAWAQgBIAFAAIAAAaIgJAAQgoAAAAgqg");
	this.shape_566.setTransform(244.425,560.5);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#01192C").s().p("AgvBEQgPgNAAgVQgBg0BbAAIAGAAIAAgCQAAgiggAAQgXAAgTAPIgMgWQAWgSAhAAQAdAAAQAQQAQAQAAAcIAABfIgbAAIAAgOIABgMIgBAAQgNAegjAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgPQALgPAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_567.setTransform(231.4,563.45);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#01192C").s().p("AgwA4QgWgVAAgjQAAgjAWgVQAVgXAgAAQAfAAASAWQARATAAAfIgBAMIhuAAQABAXAQAOQAOAMAUAAQAaAAATgSIAMAWQgWAWglAAQgiAAgXgYgAApgRQgBgSgKgLQgKgJgQAAQgQgBgMALQgMAKgDASIBQAAIAAAAg");
	this.shape_568.setTransform(196.975,563.45);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgCQAAgiggAAQgXAAgTAPIgMgWQAWgSAiAAQAcAAAQAQQAPAQAAAcIAABfIgbAAIAAgOIACgMIgCAAQgLAegkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgPQALgPAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_569.setTransform(169.55,563.45);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#01192C").s().p("AgvBEQgPgNAAgVQAAg0BaAAIAHAAIAAgDQgBghggAAQgXAAgTAPIgMgWQAWgRAhgBQAdAAAQAQQAQAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgkAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_570.setTransform(1179.2,525.45);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIAAgLIAAAAQgGANgNAKQgQAMgUAAQg0AAAAg6g");
	this.shape_571.setTransform(1162.75,525.625);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgDQABghgiAAQgWAAgTAPIgMgWQAWgRAigBQAdAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgjAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_572.setTransform(1065.85,525.45);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIABgLIgBAAQgFANgOAKQgRAMgTAAQg0AAAAg6g");
	this.shape_573.setTransform(983.4,525.625);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgWQAWgRAigBQAcAAAQAQQAPAPABAdIAABfIgbAAIAAgOIABgNIgBAAQgNAfgjAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_574.setTransform(966.15,525.45);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#01192C").s().p("AguBEQgQgNAAgVQgBg0BbAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgWQAWgRAhgBQAeAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgjAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_575.setTransform(877.55,525.45);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_576.setTransform(776.125,522.625);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIAAgLIAAAAQgGANgNAKQgRAMgTAAQg0AAAAg6g");
	this.shape_577.setTransform(758.55,525.625);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_578.setTransform(732.275,525.45);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#01192C").s().p("AAEB8Qghg5AAhIQAAg/Ahg3IAaAAQghA4ABA+QgBBEAhA9g");
	this.shape_579.setTransform(721.75,523.45);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiAAQAiAAAYAXQAYAXAAAhQAAAigYAXQgYAWgiABQgigBgXgWgAgkgmQgPAQAAAWQAAAXAPAQQAPAQAVAAQAWAAAPgQQAQgQAAgXQAAgWgQgQQgPgPgWAAQgVAAgPAPg");
	this.shape_580.setTransform(681.45,525.45);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_581.setTransform(659.275,523.425);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#01192C").s().p("AgvBEQgQgNAAgVQAAg0BbAAIAGAAIAAgDQABghgiAAQgWAAgTAPIgMgWQAWgRAigBQAdAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgjAAQgVAAgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_582.setTransform(645.55,525.45);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_583.setTransform(624.575,525.275);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAYgXAhAAQAjAAAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQghgBgYgWgAgjgmQgQAQAAAWQAAAXAQAQQAPAQAUAAQAWAAAPgQQAPgQABgXQgBgWgPgQQgPgPgWAAQgUAAgPAPg");
	this.shape_584.setTransform(590.15,525.45);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#01192C").s().p("AgYBrIAAh+IgSAAIAAgXIASAAIAAgHQABghAUgOQAOgKAVAAIAMABIAAAZIgIAAQggAAAAAfIAAAHIAkAAIAAAXIgkAAIAAB+g");
	this.shape_585.setTransform(576.3,522.375);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#01192C").s().p("AguBEQgQgNgBgVQAAg0BbAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgWQAWgRAigBQAdAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgjAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_586.setTransform(521.25,525.45);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_587.setTransform(504.975,525.275);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_588.setTransform(470.375,525.45);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#01192C").s().p("AhJBjIAKgXQAIAGAKAAQASABAJgXIAHgRIg/iVIAhAAIAmBjIAEARIABAAIAFgRIAlhjIAfAAIhHCyQgNAjgjABQgRgBgMgIg");
	this.shape_589.setTransform(402.375,528.6);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_590.setTransform(385.925,525.275);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#01192C").s().p("AguBEQgQgNgBgVQAAg0BbAAIAGAAIAAgDQABghgiAAQgWAAgTAPIgMgWQAWgRAigBQAdAAAPAQQAPAPAAAdIAABfIgbAAIAAgOIABgNIgBAAQgMAfgjAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_591.setTransform(368.35,525.45);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#01192C").s().p("AguBEQgRgNABgVQAAg0BaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgWQAWgRAhgBQAdAAAQAQQAQAPAAAdIAABfIgcAAIAAgOIABgNIgBAAQgLAfgkAAQgVAAgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_592.setTransform(313.15,525.45);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#01192C").s().p("Ag3A5IAOgUQARARAZABQAKAAAIgGQAIgFAAgIQAAgJgNgIIgZgLQgTgIgIgHQgNgLAAgRQAAgUARgMQAPgMAWAAQAiABAPARIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAJAMAGIAaAMQASAHAJAHQAMALAAASQAAASgPANQgPANgZAAQgkAAgUgXg");
	this.shape_593.setTransform(299.025,525.45);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_594.setTransform(279.275,523.425);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAghAYgXQAXgXAiAAQAjAAAXAXQAYAXAAAhQAAAigYAXQgXAWgjABQgigBgXgWgAgkgmQgPAQAAAWQAAAXAPAQQAQAQAUAAQAWAAAPgQQAPgQAAgXQAAgWgPgQQgPgPgWAAQgUAAgQAPg");
	this.shape_595.setTransform(264.6,525.45);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_596.setTransform(246.375,525.275);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#01192C").s().p("AhYBqIAAjTIBGAAQAwAAAdAcQAeAcAAAxQAAAygeAcQgdAcgwAAgAg6BQIAmAAQAkAAAUgVQAWgUAAgnQAAgmgWgUQgVgVgjAAIgmAAg");
	this.shape_597.setTransform(200.375,522.45);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_598.setTransform(159.725,525.275);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAPQgDAJAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgMATAAQA1AAAAA5IAABig");
	this.shape_599.setTransform(120.375,522.45);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_600.setTransform(105.825,523.425);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_601.setTransform(1211.675,484.45);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_602.setTransform(1197.125,485.425);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#01192C").s().p("AAkBMIgfhhIgFgQIAAAAIgDAQIggBhIggAAIgxiXIAfAAIAfBpIAFARIAAAAIAEgRIAhhpIAaAAIAhBpIADARIABAAIADgRIAghpIAfAAIgxCXg");
	this.shape_603.setTransform(1172.15,487.45);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_604.setTransform(1130.825,487.375);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#01192C").s().p("AguBEQgRgNABgWQAAgzBaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAPAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgLAegkAAQgVABgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_605.setTransform(1115.95,487.45);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_606.setTransform(1099.675,484.45);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIABgLIgBAAQgFANgOAKQgRAMgTAAQg0AAAAg6g");
	this.shape_607.setTransform(1060.35,487.625);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgXAhABQAigBAYAXQAYAWAAAiQAAAigYAXQgYAWgiAAQghAAgYgWgAgjgmQgQAPAAAXQAAAYAQAPQAPAQAUAAQAWAAAPgQQAQgPAAgYQAAgXgQgPQgPgPgWAAQgUAAgPAPg");
	this.shape_608.setTransform(1042.15,487.45);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#01192C").s().p("Ag5BhIAKgXQATAKAXAAQAUAAANgKQAOgLAAgWIAAgLIAAgJIgBAAQgNAXgfAAQgeAAgTgWQgSgWAAggQAAgiASgUQARgWAfAAQAkAAALAWIAAAAIAAgEIAAgPIAcAAIAACRQAAAjgXASQgWAQgfAAQgbAAgZgMgAgehFQgLANAAAXQABAYALAOQAMAOAUAAQAnAAAAgzQAAgzgqAAQgTAAgLAOg");
	this.shape_609.setTransform(1000.45,490.425);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_610.setTransform(983.175,487.275);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_611.setTransform(957.675,484.45);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_612.setTransform(943.125,485.425);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#01192C").s().p("AhJBjIAKgXQAIAGAKABQASgBAJgWIAHgSIg/iUIAhAAIAmBjIAEASIABAAIAFgRIAlhkIAfAAIhHCyQgNAjgjABQgRgBgMgIg");
	this.shape_613.setTransform(930.075,490.6);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_614.setTransform(913.625,487.275);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#01192C").s().p("AgvBEQgPgNAAgWQgBgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAhABQAdAAAQAPQAQAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgNAegjAAQgVABgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_615.setTransform(896.05,487.45);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAYgXAhABQAigBAYAXQAYAWAAAiQAAAigYAXQgYAWgiAAQghAAgYgWgAgjgmQgQAPAAAXQAAAYAQAPQAPAQAUAAQAWAAAPgQQAQgPAAgYQAAgXgQgPQgPgPgWAAQgUAAgPAPg");
	this.shape_616.setTransform(871.6,487.45);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_617.setTransform(856.875,485.425);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_618.setTransform(821.575,487.275);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_619.setTransform(738.425,487.275);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_620.setTransform(719.825,487.375);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#01192C").s().p("AhHBsIAAjTIAaAAIAAANIAAALIAAAAQANgcAmAAQAeAAASAWQASAWAAAkQAAAjgTAWQgTAVgeAAQghAAgNgYIgBAAIABANIAABEgAgdhEQgOAOAAAbQAAAWALAPQAMARAUAAQARAAANgPQANgOAAgZQgBgYgLgPQgMgPgTAAQgSAAgLANg");
	this.shape_621.setTransform(688.2,490.275);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#01192C").s().p("AgdB8QAhg9AAhDQAAg/ghg4IAaAAQAhA3AAA/QAABIghA5g");
	this.shape_622.setTransform(665.8,485.45);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#01192C").s().p("AhJBjIAKgXQAIAGAKABQASgBAJgWIAHgSIg/iUIAhAAIAmBjIAEASIABAAIAFgRIAlhkIAfAAIhHCyQgNAjgjABQgRgBgMgIg");
	this.shape_623.setTransform(654.225,490.6);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_624.setTransform(629.875,487.275);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#01192C").s().p("Ag5A5QgYgXAAgiQAAgiAYgWQAXgXAiABQAigBAYAXQAYAWAAAiQAAAigYAXQgYAWgiAAQgiAAgXgWgAgkgmQgPAPAAAXQAAAYAPAPQAPAQAVAAQAWAAAPgQQAPgPAAgYQAAgXgPgPQgPgPgWAAQgVAAgPAPg");
	this.shape_625.setTransform(611.35,487.45);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#01192C").s().p("AAkBMIgfhhIgFgQIAAAAIgDAQIggBhIggAAIgxiXIAfAAIAfBpIAFARIAAAAIAEgRIAhhpIAaAAIAgBpIAFARIAAAAIADgRIAhhpIAeAAIgxCXg");
	this.shape_626.setTransform(582.1,487.45);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#01192C").s().p("AgNBqIAAiXIAcAAIAACXgAgOhLIAAgeIAdAAIAAAeg");
	this.shape_627.setTransform(549.525,484.45);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#01192C").s().p("AAEB8Qghg5AAhIQAAg/Ahg3IAaAAQghA4ABA/QgBBDAhA9g");
	this.shape_628.setTransform(526.9,485.45);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#01192C").s().p("AgQBMIg4iXIAfAAIAlBmQADAIABANIAAAAQADgNADgIIAlhmIAeAAIg4CXg");
	this.shape_629.setTransform(489.825,487.45);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#01192C").s().p("AAnBqIAAhbQAAgRgFgJQgHgLgRAAQgPAAgOALQgNAKgEAQQgDAIAAAMIAABHIgdAAIAAjTIAdAAIAABOIAAANIAAAAQAGgOANgJQARgLATAAQA1AAAAA4IAABig");
	this.shape_630.setTransform(457.625,484.45);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_631.setTransform(421.975,485.425);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#01192C").s().p("AAnBOIAAhaQAAgSgFgJQgHgLgRAAQgQAAgNAKQgNALgEAQQgDAIAAAMIAABHIgdAAIAAiXIAcAAIAAAUIAAALIAAAAQAGgNANgJQAQgNAVAAQA1AAAAA6IAABhg");
	this.shape_632.setTransform(407.775,487.275);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#01192C").s().p("Ag1BWQgSgWAAgkQAAgjATgVQATgWAeAAQAiAAAMAYIABAAIgBgKIAAhHIAdAAIAADTIgbAAIAAgOIAAgKIgBAAQgMAcgkAAQgfAAgSgWgAgdgLQgNAOAAAZQAAAZAMAPQAMAPASAAQATAAAMgNQANgPAAgbQAAgWgLgOQgLgRgVAAQgSAAgMAOg");
	this.shape_633.setTransform(372.475,484.625);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#01192C").s().p("AhDAUIAAhhIAeAAIAABaQAAASAEAJQAHALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIAAgLIAAAAQgGANgNAKQgRAMgTAAQg0AAAAg6g");
	this.shape_634.setTransform(354.9,487.625);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#01192C").s().p("AgBBYQgWgOAAghIAAhGIgUAAIAAgXIAVAAIAAgsIAbAAIAAAsIAlAAIAAAXIglAAIAABDQAAAiAgAAIAHgBIAAAaIgKAAQgWAAgNgJg");
	this.shape_635.setTransform(340.675,485.425);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_636.setTransform(328.625,487.45);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#01192C").s().p("AgpBNIAAiXIAcAAIAAAaIAAAMIAAAAQAGgSALgKQANgMARAAIAIABIAAAdIgJgBQgOAAgLAJQgLAKgFAQQgEAMAAAPIAAA+g");
	this.shape_637.setTransform(292.825,487.375);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#01192C").s().p("AhDAUIAAhhIAdAAIAABaQABASAFAJQAGALARAAQAVAAAOgSQANgQAAgWIAAhIIAdAAIAACXIgcAAIAAgUIAAgLIAAAAQgGANgNAKQgQAMgUAAQg0AAAAg6g");
	this.shape_638.setTransform(277.3,487.625);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_639.setTransform(261.725,487.45);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#01192C").s().p("AgvBEQgQgNAAgWQAAgzBbAAIAGAAIAAgDQAAghggAAQgXAAgTAPIgMgVQAWgTAiABQAcAAAQAPQAPAQABAcIAABfIgbAAIAAgPIABgMIgBAAQgNAegjAAQgVABgPgMgAghAgQAAAKAHAGQAIAIAOAAQAQAAAMgQQALgOAAgSIAAgFIgHAAQg9AAAAAdg");
	this.shape_640.setTransform(206.55,487.45);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#01192C").s().p("ABWBOIAAhaQAAgTgFgIQgGgLgQAAQgPAAgMALQgLALgEARQgDAIAAALIAABGIgcAAIAAhaQAAgSgEgJQgGgLgQAAQgQAAgMAMQgLAKgEASQgCAHAAALIAABGIgdAAIAAiXIAcAAIAAAUIgBALIABAAQAFgOAPgKQAPgLARAAQAlAAAIAjIAAAAQAHgPAOgJQAPgLASAAQAyAAAAA6IAABhg");
	this.shape_641.setTransform(185.575,487.275);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#01192C").s().p("Ag3A5IAOgUQARASAZAAQAKgBAIgFQAIgFAAgIQAAgKgNgGIgZgNQgTgHgIgHQgNgMAAgQQAAgVARgLQAPgLAWAAQAigBAPASIgLAVQgOgNgYAAQgJAAgHAEQgIAFAAAKQAAAIAMAHIAaAMQASAHAJAHQAMALAAASQAAATgPAMQgPAMgZAAQgkABgUgXg");
	this.shape_642.setTransform(140.675,487.45);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#01192C").s().p("AguBEQgQgNAAgWQAAgzBaAAIAHAAIAAgDQAAghgiAAQgWAAgTAPIgMgVQAWgTAhABQAeAAAPAPQAPAQAAAcIAABfIgbAAIAAgPIABgMIgBAAQgMAegjAAQgVABgOgMgAghAgQAAAKAHAGQAIAIANAAQARAAAMgQQALgOAAgSIAAgFIgIAAQg8AAAAAdg");
	this.shape_643.setTransform(125.6,487.45);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#01192C").s().p("AgYBAIAAipIAcAAIAACkQAAAVAQABIAFAAIAAAZIgJABQgoAAAAgrg");
	this.shape_644.setTransform(98.275,484.5);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#01192C").s().p("AhHBqIAAjTIBMAAQAdAAATATQATASAAAeQAAAdgTASQgTASgdAAIgvAAIAABPgAgqACIAqAAQAUAAAKgLQAMgLAAgSQAAgUgMgKQgKgLgUAAIgqAAg");
	this.shape_645.setTransform(85.55,484.45);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#F2F2F2").s().p("Ag+A+IAAh7IB9AAIAAB7g");
	this.shape_646.setTransform(827.05,391.275);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#F2F2F2").s().p("AgPDiQhEglAAhXIAAiIIgzAAIAAhnIA3AAIAAhwIB+AAIAABwIBSAAIAABnIhSAAIAAB3QAAAyBGAAIARgBIAAByQgOACgVAAQhGAAgsgYg");
	this.shape_647.setTransform(800.15,372.825);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_648.setTransform(761.025,377.475);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiABQA4AAAzgpIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_649.setTransform(715.125,377.95);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#F2F2F2").s().p("ACsDIIAAjnQAAgxgfAAQg6AAgOBKQgDANAAAfIAACiIiDAAIAAjnQAAgxgeAAQg4AAgPBHQgEARAAAeIAACiIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAthDBHAAQBNAAAfBCIACAAQARgbAfgSQAkgVApAAQB/AAAACSIAAD9g");
	this.shape_650.setTransform(659.225,377.475);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiABQA4AAAzgpIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_651.setTransform(602.625,377.95);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#F2F2F2").s().p("AiEDHIAAmGIB+AAIAABBQABANgCAMIABAAQAMgpAigcQAjgcArAAIAPABIAACBQgLgCgPAAQhPAAgXBFQgFAUAAAgIAACUg");
	this.shape_652.setTransform(566.85,377.6);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#F2F2F2").s().p("AilD1IAlhkQAxAZA9AAQBaAAAAhKIAAgOIAAgOIgBAAQgiApg/AAQhTAAgxg9Qgsg2AAhQQAAhRArg1QAwg7BUAAQBHAAAjAmIACAAIgBgJIAAgUIB8AAIAAFjQAABjhHA0Qg8AshaAAQhQAAhEgjgAg1iTQgRAVAAAjQAAAnASAZQAUAbAlAAQBGAAAAhVQAAhVhLAAQgiABgTAWg");
	this.shape_653.setTransform(523.5,385.45);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#F2F2F2").s().p("AiNCrQgogkAAg4QAAhKBbggQA6gUBOAAIAEAAIAAgHQAAgsg4AAQgyAAg4AlIgthcQBDgzBfAAQBUAAAuArQAvAqAABLIAADwIh4AAIAAgYQAAgNACgMIgCAAQgdA6hRAAQg5AAgkgigAgUAlQgdAMAAAXQAAAgAlAAQAZAAATgWQAUgWAAgZIAAgIIgMAAQgkAAgYAKg");
	this.shape_654.setTransform(478.45,377.95);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_655.setTransform(1202.025,284.275);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#F2F2F2").s().p("AicCVQhBg6AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahBA6Qg/A4heAAQhdAAg/g4gAg9hEQgaAbAAAqQAAArAaAaQAZAaAkgBQAmABAYgaQAbgaAAgrQAAgqgbgbQgZgaglAAQgkAAgZAag");
	this.shape_656.setTransform(1153.45,284.75);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#F2F2F2").s().p("AhBEQIAAmHICDAAIAAGHgAg/ioIAAhnIB/AAIAABng");
	this.shape_657.setTransform(1117.875,277.125);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#F2F2F2").s().p("AgPDiQhEglAAhXIAAiIIgyAAIAAhnIA2AAIAAhwIB+AAIAABwIBSAAIAABnIhSAAIAAB3QABAyBGAAIARgBIAAByQgOACgWAAQhFAAgtgYg");
	this.shape_658.setTransform(1090.2,279.625);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#F2F2F2").s().p("AiHCOQg5g5AAhVQAAhUA4g5QA+g/BjAAQBrAAAxA7Ig4BYQgmgmg1ABQgsgBgZAeQgYAaAAAmQAAAmAYAbQAcAfAtAAQA3ABA0gwIAwBcQg6BBhuAAQhjAAg9g/g");
	this.shape_659.setTransform(1054.375,284.75);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABVQAAAMgDAbIj2AAQAHAiAbATQAXARAiAAQA4ABAzgoIAxBcQg/A5hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_660.setTransform(1011.625,284.75);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#F2F2F2").s().p("AgPDiQhEglAAhXIAAiIIgyAAIAAhnIA2AAIAAhwIB+AAIAABwIBSAAIAABnIhSAAIAAB3QABAyBGAAIARgBIAAByQgOACgWAAQhGAAgsgYg");
	this.shape_661.setTransform(974.1,279.625);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#F2F2F2").s().p("AicCVQhBg6AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahAA6Qg/A4hfAAQhdAAg/g4gAg+hEQgaAbAAAqQAAArAaAaQAaAaAkgBQAlABAagaQAagaAAgrQAAgqgagbQgagaglAAQgkAAgaAag");
	this.shape_662.setTransform(934.7,284.75);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#F2F2F2").s().p("AiEDHIAAmHIB/AAIAABCQgBANgBAMIACAAQALgpAigbQAjgdArAAQAHAAAIACIAACBQgKgDgRAAQhOAAgXBEQgFAVgBAgIAACUg");
	this.shape_663.setTransform(896.05,284.4);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#F2F2F2").s().p("AjOEUIAAoeIB3AAIAAAUQAAAMgCANIACAAQAkg2BRAAQBQAAAxA5QAwA4AABcQAABbg0A4QgzA5hPAAQg/AAgkgmIgCAAQACAOAAATIAACTgAg2iOQgYAaAAAwQAAAnATAZQAVAdAlAAQAfAAAWgZQAXgYAAgsQAAgsgWgaQgVgaghAAQggAAgVAWg");
	this.shape_664.setTransform(855.025,291.875);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#F2F2F2").s().p("AiNCqQgogjAAg5QAAhJBbggQA6gVBNAAIAGAAIAAgHQgBgrg4AAQgyAAg3AmIguhdQBDgzBgAAQBSAAAvAqQAvArAABKIAADwIh4AAIAAgXQAAgNABgLIgBAAQgdA5hRAAQg5AAgkgjgAgUAlQgcAMAAAWQgBAhAlAAQAYAAAUgXQAUgVAAgZIAAgJIgMAAQgkAAgYALg");
	this.shape_665.setTransform(789.65,284.75);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#F2F2F2").s().p("AgPDiQhEglAAhXIAAiIIgyAAIAAhnIA2AAIAAhwIB/AAIAABwIBSAAIAABnIhSAAIAAB3QgBAyBHAAIAQgBIAAByQgNACgWAAQhFAAgtgYg");
	this.shape_666.setTransform(753.3,279.625);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#F2F2F2").s().p("AiNCqQgogjAAg5QAAhJBbggQA6gVBOAAIAEAAIAAgHQAAgrg4AAQgyAAg4AmIgthdQBDgzBfAAQBUAAAuAqQAvArAABKIAADwIh4AAIAAgXQAAgNACgLIgCAAQgdA5hRAAQg5AAgkgjgAgUAlQgdAMAAAWQAAAhAlAAQAZAAATgXQAUgVAAgZIAAgJIgMAAQgkAAgYALg");
	this.shape_667.setTransform(715.6,284.75);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#F2F2F2").s().p("AieDbQgwg4AAhcQAAhbAzg5QAxg4BPAAQBOABAXAfIACAAIgBgRIAAieICEAAIAAIfIh7AAIAAgaIAAgWIgBAAQghA6hPAAQhQAAgxg6gAgyABQgXAaAAAsQAAAsAVAaQAVAbAhAAQAhAAAVgYQAXgZAAgwQAAgngTgZQgVgcglgBQgfAAgVAXg");
	this.shape_668.setTransform(669.975,277.6);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#F2F2F2").s().p("AiNCqQgogjAAg5QAAhJBbggQA6gVBOAAIAEAAIAAgHQAAgrg4AAQgyAAg4AmIguhdQBEgzBfAAQBTAAAvAqQAvArAABKIAADwIh4AAIAAgXQAAgNACgLIgCAAQgdA5hRAAQg4AAglgjgAgUAlQgdAMAAAWQABAhAkAAQAZAAATgXQAUgVAAgZIAAgJIgMAAQgkAAgYALg");
	this.shape_669.setTransform(607.25,284.75);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#F2F2F2").s().p("AiEDHIAAmHIB+AAIAABCQABANgCAMIABAAQAMgpAigbQAjgdArAAQAIAAAHACIAACBQgLgDgPAAQhPAAgWBEQgHAVABAgIAACUg");
	this.shape_670.setTransform(555.25,284.4);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#F2F2F2").s().p("AicCVQhBg6AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahBA6Qg+A4hfAAQhdAAg/g4gAg9hEQgbAbAAAqQAAArAbAaQAZAaAkgBQAlABAagaQAagaAAgrQAAgqgagbQgagaglAAQgkAAgZAag");
	this.shape_671.setTransform(512.95,284.75);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#F2F2F2").s().p("AhUERIAAkZIgwAAIAAhmIAwAAIAAgRQAAhUBCglQArgYBFAAQAXAAAQACIAABvQgIgCgNAAQhCAAAAAnIAAAMIBIAAIAABmIhIAAIAAEZg");
	this.shape_672.setTransform(475.475,277);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#F2F2F2").s().p("AieDbQgwg4AAhcQAAhbAzg5QAxg4BPAAQBOABAXAfIACAAIgBgRIAAieICEAAIAAIfIh7AAIAAgaIAAgWIgBAAQghA6hPAAQhQAAgxg6gAgyABQgXAaAAAsQAAAsAVAaQAVAbAhAAQAhAAAVgYQAXgZAAgwQAAgngTgZQgVgcglgBQgfAAgVAXg");
	this.shape_673.setTransform(416.725,277.6);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABVQAAAMgDAbIj2AAQAHAiAbATQAXARAiAAQA4ABAzgoIAxBcQg/A5hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_674.setTransform(372.375,284.75);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABVQAAAMgDAbIj2AAQAHAiAbATQAXARAiAAQA4ABAzgoIAxBcQg/A5hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_675.setTransform(329.625,284.75);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_676.setTransform(284.475,284.275);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#F2F2F2").s().p("AicCVQhBg6AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahAA6QhAA4heAAQhdAAg/g4gAg+hEQgaAbAAAqQAAArAaAaQAaAaAkgBQAmABAYgaQAbgaAAgrQAAgqgbgbQgZgaglAAQgkAAgaAag");
	this.shape_677.setTransform(218.5,284.75);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_678.setTransform(170.475,284.275);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#F2F2F2").s().p("AieCTIA5hYQArAnA5AAQAlAAAAgSQAAgKgcgMIg+gaQhcgpAAhMQAAg2AvghQAtggBEAAQBcAAAuAtIgtBdQgmggg3AAQgmAAAAAUQABAIAbALIA/AYQBcAogBBMQAAA0gpAjQgtAlhIAAQhjAAg7g6g");
	this.shape_679.setTransform(110.55,284.75);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#F2F2F2").s().p("AhBEQIAAmHICDAAIAAGHgAg/ioIAAhnIB/AAIAABng");
	this.shape_680.setTransform(81.475,277.125);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiAAQA4AAAzgoIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_681.setTransform(1188.725,191.55);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#F2F2F2").s().p("AiEDHIAAmGIB+AAIAABCQAAAMgBAMIABAAQAMgpAigcQAjgcArAAIAPABIAACBQgKgCgQAAQhPAAgWBFQgHAUABAgIAACUg");
	this.shape_682.setTransform(1152.95,191.2);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiAAQA4AAAzgoIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_683.setTransform(1113.325,191.55);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#F2F2F2").s().p("ABAEQIAAjmQAAgzgrAAQg6AAgTA5QgHAUAAAeIAACuIiEAAIAAofICEAAIAACsQAAAUgCAOIACAAQAjg/BTAAQCNAAAACSIAAD+g");
	this.shape_684.setTransform(1068.175,183.925);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#F2F2F2").s().p("AgPDiQhEglAAhXIAAiIIgzAAIAAhnIA3AAIAAhwIB+AAIAABwIBSAAIAABnIhSAAIAAB3QAAAyBGAAIARgBIAAByQgOACgVAAQhFAAgtgYg");
	this.shape_685.setTransform(1027.5,186.425);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#F2F2F2").s().p("AidCTIA4hZQArAoA4ABQAmAAAAgTQAAgLgdgMIg9gZQhcgpAAhMQAAg2AvghQAtggBEAAQBbAAAvAtIgtBdQgmggg3AAQgmAAABATQAAAKAbAKIA/AZQBcAoAABLQgBA0gqAiQgsAmhJAAQhhAAg7g6g");
	this.shape_686.setTransform(976.75,191.55);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiAAQA4AAAzgoIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_687.setTransform(937.625,191.55);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#F2F2F2").s().p("AieCTIA5hZQArAoA5ABQAlAAAAgTQAAgLgcgMIg+gZQhcgpAAhMQAAg2AvghQAtggBEAAQBcAAAuAtIgtBdQgmggg3AAQgmAAAAATQAAAKAcAKIA/AZQBcAoAABLQAAA0grAiQgsAmhIAAQhiAAg8g6g");
	this.shape_688.setTransform(898.25,191.55);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_689.setTransform(856.725,191.075);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#F2F2F2").s().p("AicCUQhBg5AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahBA5Qg+A5hfAAQhdAAg/g5gAg+hFQgaAbAAArQAAArAaAaQAaAZAkAAQAlAAAagZQAagaAAgrQAAgrgagbQgagaglAAQgkAAgaAag");
	this.shape_690.setTransform(808.15,191.55);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#F2F2F2").s().p("AjOEUIAAoeIB3AAIAAAUQAAAMgCANIACAAQAkg2BRAAQBQAAAxA5QAwA4AABcQAABbg0A4QgzA5hPAAQg/AAgkgmIgCAAQACAOAAATIAACTgAg2iOQgYAaAAAwQAAAnATAZQAVAdAlAAQAfAAAWgZQAXgYAAgsQAAgsgWgaQgVgaghAAQggAAgVAWg");
	this.shape_691.setTransform(761.125,198.675);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#F2F2F2").s().p("AieCTIA5hZQArAoA4ABQAmAAAAgTQAAgLgcgMIg+gZQhcgpAAhMQAAg2AvghQAtggBEAAQBcAAAuAtIgtBdQgmggg3AAQgmAAAAATQABAKAbAKIA/AZQBbAoAABLQAAA0gpAiQgtAmhIAAQhjAAg7g6g");
	this.shape_692.setTransform(717.5,191.55);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiAAQA4AAAzgoIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_693.setTransform(678.375,191.55);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#F2F2F2").s().p("AiEDHIAAmGIB/AAIAABCQgBAMgBAMIACAAQAMgpAhgcQAkgcAqAAIAPABIAACBQgLgCgQAAQhOAAgXBFQgFAUgBAgIAACUg");
	this.shape_694.setTransform(642.6,191.2);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#F2F2F2").s().p("AiEDHIAAmGIB/AAIAABCQAAAMgCAMIACAAQAMgpAhgcQAkgcAqAAIAPABIAACBQgLgCgQAAQhOAAgXBFQgGAUAAAgIAACUg");
	this.shape_695.setTransform(592.55,191.2);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#F2F2F2").s().p("AjBA2IAAj9ICEAAIAADkQAAA0ApAAQAoAAAWggQAUgdAAguIAAitICEAAIAAGGIh/AAIAAgiQAAgNACgLIgCAAQgPAegiATQggASgoAAQiLABAAiTg");
	this.shape_696.setTransform(550.175,192);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#F2F2F2").s().p("AicCUQhBg5AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahBA5Qg/A5heAAQhdAAg/g5gAg9hFQgaAbAAArQAAArAaAaQAZAZAkAAQAmAAAZgZQAagaAAgrQAAgrgagbQgagaglAAQgkAAgZAag");
	this.shape_697.setTransform(502.3,191.55);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#F2F2F2").s().p("AjID4IAqhhQAWAPATAAQAvAAAQgnIAHgTIiml+ICVAAIA5C0QAHAVAHAnIABAAIANg6IAyi2ICPAAIigGwQgXA9guAfQgpAag0AAQg0gBgogbg");
	this.shape_698.setTransform(456.825,199.5);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#F2F2F2").s().p("ABADIIAAjkQAAg0grAAQg5AAgTA4QgIAWAAAdIAACtIiEAAIAAmGIB/AAIAAAiQAAANgCALIACAAQAohDBTAAQCNAAAACSIAAD9g");
	this.shape_699.setTransform(395.425,191.075);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#F2F2F2").s().p("AicCUQhBg5AAhaQAAhaBBg6QA/g5BdAAQBeAAA/A5QBBA6AABaQAABahAA5QhAA5heAAQhdAAg/g5gAg+hFQgZAbAAArQAAArAZAaQAaAZAkAAQAlAAAZgZQAbgaAAgrQAAgrgbgbQgZgaglAAQgkAAgaAag");
	this.shape_700.setTransform(346.85,191.55);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#F2F2F2").s().p("AieDbQgwg4AAhcQAAhbAzg4QAxg4BPAAQBOgBAXAgIACAAIgBgSIAAicICEAAIAAIeIh7AAIAAgaIAAgWIgBAAQghA5hPAAQhQAAgxg5gAgyACQgXAZAAAsQAAAsAVAaQAVAbAhgBQAhAAAVgXQAXgZAAgwQAAgngTgaQgVgbglAAQgfAAgVAXg");
	this.shape_701.setTransform(279.775,184.4);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#F2F2F2").s().p("AiICNQg3g6AAhTQAAhYA2g5QA5g7BbAAQBVAAAxA2QAvAzAABUQAAANgDAbIj2AAQAHAjAbASQAXARAiAAQA4AAAzgoIAxBcQg/A6hoAAQhjAAg8hAgAA8gxQAAgXgOgQQgPgRgXAAQgwAAgOA4IByAAIAAAAg");
	this.shape_702.setTransform(235.425,191.55);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#F2F2F2").s().p("AieCTIA5hZQArAoA5ABQAlAAAAgTQAAgLgcgMIg+gZQhcgpAAhMQAAg2AvghQAtggBEAAQBcAAAuAtIgtBdQgmggg3AAQgmAAAAATQABAKAbAKIA/AZQBcAogBBLQAAA0gpAiQgtAmhIAAQhjAAg7g6g");
	this.shape_703.setTransform(196.05,191.55);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#F2F2F2").s().p("AiOCrQgngkAAg4QAAhKBbggQA6gUBNgBIAGAAIAAgGQAAgsg6AAQgwAAg4AlIguhcQBDgzBgAAQBSAAAvArQAvAqAABLIAADwIh4AAIAAgYQAAgNABgMIgBAAQgdA6hRAAQg5AAglgigAgUAlQgcAMAAAXQgBAgAmAAQAXAAAVgWQATgWAAgZIAAgIIgMAAQgkAAgYAKg");
	this.shape_704.setTransform(155.95,191.55);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#F2F2F2").s().p("AjKEQIAAofIDIAAQBSAAAxAkQA0AmAABFQAAAjgQAfQgRAggeARIAAABQArANAXAlQATAgAAAoQAABTg/AqQg2AlhYAAgAhGCeIBPAAQAcAAAQgRQAOgQAAgYQAAgYgOgPQgPgRgcAAIhQAAgAhGg8IBFAAQAvAAAAgyQAAgvgxAAIhDAAg");
	this.shape_705.setTransform(112.525,183.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},70).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},7).to({state:[{t:this.shape_24},{t:this.shape_23,p:{x:219.375,y:159.275}},{t:this.shape_22},{t:this.shape_21,p:{x:260.625,y:159.425}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15,p:{x:506.15,y:166.425}},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{x:910.475,y:159.425}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{x:1056.625,y:159.275}},{t:this.shape_1},{t:this.shape,p:{x:1128.925,y:158.725}}]},1).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_21,p:{x:1059.375,y:183.625}},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_23,p:{x:433.325,y:276.675}},{t:this.shape_32},{t:this.shape_31},{t:this.shape_2,p:{x:525.225,y:276.675}},{t:this.shape_15,p:{x:557.9,y:283.825}},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_6,p:{x:868.325,y:276.825}},{t:this.shape,p:{x:893.775,y:276.125}}]},1).to({state:[{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198,p:{x:318.425,y:476.45}},{t:this.shape_197},{t:this.shape_196,p:{x:355.625,y:476.275}},{t:this.shape_195,p:{x:378.7,y:479.275}},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191,p:{x:436.025,y:476.45}},{t:this.shape_190,p:{x:447.275,y:473.45}},{t:this.shape_189,p:{x:459.525,y:473.625}},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185,p:{x:537.225,y:473.625}},{t:this.shape_184,p:{x:550.425,y:473.45}},{t:this.shape_183,p:{x:559.475,y:474.425}},{t:this.shape_182,p:{x:568.575,y:473.45}},{t:this.shape_181,p:{x:581.475,y:476.275}},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176,p:{x:663.275,y:474.425}},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173,p:{x:715.325,y:476.375}},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168,p:{x:780.125,y:476.275}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165,p:{x:834.225,y:474.425}},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158,p:{x:941.725,y:476.275}},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155,p:{x:987.875,y:473.45}},{t:this.shape_154,p:{x:996.925,y:474.425}},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151,p:{x:530.175,y:511.45}},{t:this.shape_150,p:{x:542.425,y:511.625}},{t:this.shape_149,p:{x:564.225,y:511.5}},{t:this.shape_148,p:{x:571.225,y:511.45}},{t:this.shape_147},{t:this.shape_146,p:{x:599.675,y:514.45}},{t:this.shape_145,p:{x:617.175,y:514.275}},{t:this.shape_144},{t:this.shape_143,p:{x:650.775,y:514.45}},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139,p:{x:726.825,y:514.275}},{t:this.shape_138,p:{x:745.725,y:512.425}},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135,p:{x:784.025,y:511.45}},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132,p:{x:320.475,y:552.45}},{t:this.shape_131},{t:this.shape_130,p:{x:357.1,y:549.375}},{t:this.shape_129,p:{x:368.075,y:552.375}},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126,p:{x:421.375,y:552.45}},{t:this.shape_125},{t:this.shape_124,p:{x:452.025,y:552.375}},{t:this.shape_123,p:{x:463.475,y:552.45}},{t:this.shape_122,p:{x:473.925,y:549.45}},{t:this.shape_121,p:{x:487,y:552.45}},{t:this.shape_120,p:{x:505.525,y:552.275}},{t:this.shape_119},{t:this.shape_118,p:{x:548.575,y:552.45}},{t:this.shape_117,p:{x:563.625,y:552.45}},{t:this.shape_116,p:{x:576.575,y:549.5}},{t:this.shape_115},{t:this.shape_114,p:{x:596.975,y:551.5}},{t:this.shape_113},{t:this.shape_112,p:{x:617.825,y:549.45}},{t:this.shape_111,p:{x:630.725,y:552.275}},{t:this.shape_110},{t:this.shape_109,p:{x:664.575,y:552.275}},{t:this.shape_108},{t:this.shape_107,p:{x:698.175,y:552.45}},{t:this.shape_106,p:{x:715.025,y:549.625}},{t:this.shape_105},{t:this.shape_104,p:{x:744.675,y:549.45}},{t:this.shape_103},{t:this.shape_102,p:{x:783.7,y:552.45}},{t:this.shape_101,p:{x:800.575,y:552.45}},{t:this.shape_100,p:{x:811.825,y:549.45}},{t:this.shape_99,p:{x:823.875,y:552.45}},{t:this.shape_98,p:{x:835.425,y:560}},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95,p:{x:886.775,y:552.375}},{t:this.shape_94,p:{x:899.875,y:552.45}},{t:this.shape_93,p:{x:916.525,y:552.45}},{t:this.shape_92,p:{x:934.025,y:552.275}},{t:this.shape_91},{t:this.shape_90,p:{x:957.575,y:549.5}},{t:this.shape_89,p:{x:970.2,y:552.45}},{t:this.shape_88}]},1).to({state:[{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452,p:{x:156.475,y:473.05}},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_168,p:{x:231.825,y:472.875}},{t:this.shape_448,p:{x:247.375,y:473.05}},{t:this.shape_182,p:{x:257.825,y:470.05}},{t:this.shape_185,p:{x:270.075,y:470.225}},{t:this.shape_447,p:{x:287.875,y:473.05}},{t:this.shape_446,p:{x:302.675,y:472.975}},{t:this.shape_445},{t:this.shape_158,p:{x:340.125,y:472.875}},{t:this.shape_444,p:{x:356.575,y:476.2}},{t:this.shape_443,p:{x:379.4,y:473.05}},{t:this.shape_442},{t:this.shape_441,p:{x:401.025,y:471.025}},{t:this.shape_440,p:{x:414.725,y:473.05}},{t:this.shape_439,p:{x:429.525,y:472.975}},{t:this.shape_145,p:{x:443.475,y:472.875}},{t:this.shape_438},{t:this.shape_437,p:{x:473.475,y:471.025}},{t:this.shape_155,p:{x:482.575,y:470.05}},{t:this.shape_191,p:{x:493.825,y:473.05}},{t:this.shape_436,p:{x:509.675,y:473.05}},{t:this.shape_435,p:{x:524.675,y:473.05}},{t:this.shape_434},{t:this.shape_151,p:{x:567.225,y:470.05}},{t:this.shape_433,p:{x:576.275,y:471.025}},{t:this.shape_432},{t:this.shape_148,p:{x:603.425,y:470.05}},{t:this.shape_120,p:{x:616.325,y:472.875}},{t:this.shape_431,p:{x:638.225,y:471.025}},{t:this.shape_430},{t:this.shape_429,p:{x:669.975,y:473.05}},{t:this.shape_428,p:{x:694.325,y:473.05}},{t:this.shape_198,p:{x:710.275,y:473.05}},{t:this.shape_135,p:{x:721.575,y:470.05}},{t:this.shape_427,p:{x:731.975,y:473.05}},{t:this.shape_426,p:{x:744.025,y:471.025}},{t:this.shape_122,p:{x:753.125,y:470.05}},{t:this.shape_111,p:{x:766.025,y:472.875}},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_173,p:{x:843.525,y:472.975}},{t:this.shape_183,p:{x:853.625,y:471.025}},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_112,p:{x:899.375,y:470.05}},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415,p:{x:971.525,y:473.05}},{t:this.shape_414},{t:this.shape_413,p:{x:1002.325,y:473.05}},{t:this.shape_412,p:{x:1017.375,y:473.05}},{t:this.shape_411},{t:this.shape_410},{t:this.shape_104,p:{x:1061.425,y:470.05}},{t:this.shape_409},{t:this.shape_408,p:{x:1090.375,y:470.05}},{t:this.shape_407},{t:this.shape_146,p:{x:1131.375,y:473.05}},{t:this.shape_129,p:{x:1146.175,y:472.975}},{t:this.shape_143,p:{x:1159.275,y:473.05}},{t:this.shape_176,p:{x:1180.625,y:471.025}},{t:this.shape_406,p:{x:1195.35,y:473.05}},{t:this.shape_124,p:{x:385.075,y:510.975}},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_165,p:{x:477.775,y:509.025}},{t:this.shape_154,p:{x:496.175,y:509.025}},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_101,p:{x:569.325,y:511.05}},{t:this.shape_397},{t:this.shape_396},{t:this.shape_109,p:{x:633.875,y:510.875}},{t:this.shape_395},{t:this.shape_394},{t:this.shape_138,p:{x:696.825,y:509.025}},{t:this.shape_393},{t:this.shape_392},{t:this.shape_90,p:{x:744.225,y:508.1}},{t:this.shape_391},{t:this.shape_390},{t:this.shape_92,p:{x:799.475,y:510.875}},{t:this.shape_389},{t:this.shape_100,p:{x:825.475,y:508.05}},{t:this.shape_150,p:{x:837.725,y:508.225}},{t:this.shape_388},{t:this.shape_95,p:{x:870.325,y:510.975}},{t:this.shape_387},{t:this.shape_106,p:{x:900.275,y:508.225}},{t:this.shape_386,p:{x:913.575,y:517.1}}]},1).to({state:[{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_447,p:{x:109.875,y:487.45}},{t:this.shape_643},{t:this.shape_642},{t:this.shape_440,p:{x:155.725,y:487.45}},{t:this.shape_641},{t:this.shape_640},{t:this.shape_408,p:{x:223.775,y:484.45}},{t:this.shape_436,p:{x:239.025,y:487.45}},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_429,p:{x:305.925,y:487.45}},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_428,p:{x:390.275,y:487.45}},{t:this.shape_632},{t:this.shape_631},{t:this.shape_452,p:{x:434.025,y:487.45}},{t:this.shape_630},{t:this.shape_443,p:{x:473.9,y:487.45}},{t:this.shape_629},{t:this.shape_415,p:{x:505.675,y:487.45}},{t:this.shape_628},{t:this.shape_191,p:{x:538.275,y:487.45}},{t:this.shape_627},{t:this.shape_412,p:{x:561.575,y:487.45}},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_149,p:{x:643.375,y:484.5}},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_146,p:{x:705.025,y:487.45}},{t:this.shape_620},{t:this.shape_619},{t:this.shape_190,p:{x:755.725,y:484.45}},{t:this.shape_448,p:{x:766.125,y:487.45}},{t:this.shape_435,p:{x:779.525,y:487.45}},{t:this.shape_184,p:{x:789.975,y:484.45}},{t:this.shape_406,p:{x:803.05,y:487.45}},{t:this.shape_618},{t:this.shape_427,p:{x:837.125,y:487.45}},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_182,p:{x:970.275,y:484.45}},{t:this.shape_610},{t:this.shape_609},{t:this.shape_444,p:{x:1025.075,y:490.6}},{t:this.shape_608},{t:this.shape_607},{t:this.shape_413,p:{x:1083.775,y:487.45}},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_143,p:{x:1143.925,y:487.45}},{t:this.shape_603},{t:this.shape_155,p:{x:1188.075,y:484.45}},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_117,p:{x:137.575,y:525.45}},{t:this.shape_598},{t:this.shape_386,p:{x:177.125,y:531.5}},{t:this.shape_597},{t:this.shape_121,p:{x:220.15,y:525.45}},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_126,p:{x:329.075,y:525.45}},{t:this.shape_107,p:{x:344.925,y:525.45}},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_195,p:{x:427.3,y:528.275}},{t:this.shape_99,p:{x:444.125,y:525.45}},{t:this.shape_446,p:{x:458.925,y:525.375}},{t:this.shape_588},{t:this.shape_89,p:{x:486.45,y:525.45}},{t:this.shape_587},{t:this.shape_586},{t:this.shape_116,p:{x:534.275,y:522.5}},{t:this.shape_151,p:{x:548.975,y:522.45}},{t:this.shape_181,p:{x:561.875,y:525.275}},{t:this.shape_585},{t:this.shape_584},{t:this.shape_439,p:{x:605.975,y:525.375}},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_148,p:{x:668.375,y:522.45}},{t:this.shape_580},{t:this.shape_168,p:{x:699.975,y:525.275}},{t:this.shape_579},{t:this.shape_578},{t:this.shape_441,p:{x:744.325,y:523.425}},{t:this.shape_577},{t:this.shape_576},{t:this.shape_94,p:{x:793.925,y:525.45}},{t:this.shape_158,p:{x:811.425,y:525.275}},{t:this.shape_437,p:{x:825.625,y:523.425}},{t:this.shape_132,p:{x:837.675,y:525.45}},{t:this.shape_145,p:{x:861.275,y:525.275}},{t:this.shape_575},{t:this.shape_196,p:{x:899.775,y:525.275}},{t:this.shape_93,p:{x:921.675,y:525.45}},{t:this.shape_123,p:{x:936.675,y:525.45}},{t:this.shape_98,p:{x:946.625,y:533}},{t:this.shape_574},{t:this.shape_573},{t:this.shape_189,p:{x:1000.975,y:522.625}},{t:this.shape_135,p:{x:1014.175,y:522.45}},{t:this.shape_102,p:{x:1027.25,y:525.45}},{t:this.shape_114,p:{x:1043.675,y:524.5}},{t:this.shape_572},{t:this.shape_120,p:{x:1083.425,y:525.275}},{t:this.shape_185,p:{x:1100.825,y:522.625}},{t:this.shape_101,p:{x:1125.525,y:525.45}},{t:this.shape_122,p:{x:1136.775,y:522.45}},{t:this.shape_118,p:{x:1147.175,y:525.45}},{t:this.shape_571},{t:this.shape_570},{t:this.shape_90,p:{x:1192.225,y:522.5}},{t:this.shape_139,p:{x:148.575,y:563.275}},{t:this.shape_569},{t:this.shape_433,p:{x:183.275,y:561.425}},{t:this.shape_568},{t:this.shape_173,p:{x:211.775,y:563.375}},{t:this.shape_112,p:{x:220.275,y:560.45}},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_129,p:{x:334.375,y:563.375}},{t:this.shape_561},{t:this.shape_560},{t:this.shape_431,p:{x:382.225,y:561.425}},{t:this.shape_559},{t:this.shape_150,p:{x:414.025,y:560.625}},{t:this.shape_558},{t:this.shape_111,p:{x:449.325,y:563.275}},{t:this.shape_426,p:{x:463.525,y:561.425}},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_124,p:{x:580.725,y:563.375}},{t:this.shape_551},{t:this.shape_183,p:{x:615.175,y:561.425}},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_109,p:{x:681.575,y:563.275}},{t:this.shape_547},{t:this.shape_92,p:{x:723.125,y:563.275}},{t:this.shape_546},{t:this.shape_176,p:{x:760.325,y:561.425}},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_165,p:{x:874.025,y:561.425}},{t:this.shape_539},{t:this.shape_104,p:{x:896.525,y:560.45}},{t:this.shape_106,p:{x:908.775,y:560.625}},{t:this.shape_538},{t:this.shape_537},{t:this.shape_130,p:{x:966.85,y:560.375}},{t:this.shape_154,p:{x:984.375,y:561.425}},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_95,p:{x:1075.325,y:563.375}},{t:this.shape_138,p:{x:1085.425,y:561.425}},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_100,p:{x:1131.175,y:560.45}},{t:this.shape_529},{t:this.shape_528}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(70).to({_off:false},0).to({alpha:1},7).wait(7).to({_off:true},1).wait(5));

	// Layer_2
	this.intro_text = new lib.intro_text();
	this.intro_text.name = "intro_text";
	this.intro_text.setTransform(638.05,344.05,1,1,0,0,0,529,45.8);
	this.intro_text.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.intro_text).to({alpha:1},61).wait(6).to({_off:true},1).wait(22));

	// Layer_6
	this.try_again1 = new lib.try_again_button();
	this.try_again1.name = "try_again1";
	this.try_again1.setTransform(1133.75,670.35,0.7293,0.7289,0,0,0,133.2,29.6);
	new cjs.ButtonHelper(this.try_again1, 0, 1, 2, false, new lib.try_again_button(), 3);

	this.timeline.addTween(cjs.Tween.get(this.try_again1).wait(90));

	// Layer_1
	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#808485").s().p("Ehj/A4QMAAAhwfMDH+AAAMAAABwfg");
	this.shape_706.setTransform(639.95,359.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_706).wait(90));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(640,360,639.9000000000001,359.9);
// library properties:
lib.properties = {
	id: 'AEA54758726C4E29856A8DF399483D78',
	width: 1280,
	height: 720,
	fps: 30,
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
an.compositions['AEA54758726C4E29856A8DF399483D78'] = {
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