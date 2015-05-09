import {Option, Match} from 'mz-utils'
var {option} = Option;
var {match} = Match;

var n1 = new Option(3);
var n2 = Option.option(null);

option(n1)
  .some(v => {
  })
  .none(() => {});
n1
  .some(v => {
    console.log('value exists', v);
  })
  .none(() => {
    console.log('value doesnt exists');
  });

// n2.some(v => {
//   console.log('value exists', x);
// })
// .none(() => {
//   console.log('value doesnt exists');
// })

// var s = new Match(4)
var s = match(4)
  .when(v => v < 3, () => "below 3")
  .when(v => v >= 4, () => "over 4")
  .when(false, () => "over 4")
  .end();
// var n: number = s.value;

var s2 = match(4)
  .when(v => v < 3, () => "below 3")
  .when(v => v >= 4, () => "over 4")
  .when(false, () => "over 4")
  .default(() => {
    return "default";
  });

// var _n2: number = s2;
var _n2: string = s2;

class Entity {}
class Player extends Entity {
}

class Enemy extends Entity {
  target: Option<Entity>;
  constructor() {
    super();
    this.target = Option.nothing();
  }

  setTarget(entity: Entity) {
    this.target = Option.just(entity);
  }

  execAction(){
    this.target.some(entity => {
      console.log(entity);
    });
  }
}
