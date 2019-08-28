class EnergyProvider {
  protected energy: number = 0;
  public type: string = 'Standard';

  constructor (startingEnergy: number) {
    this.energy = startingEnergy;
  }

  public provideEnergy = (amountOfEnergy: number): number => {
    console.log(`You requested ${amountOfEnergy} from a ${this.type} type of energy source.`);

    if (amountOfEnergy <= this.energy) {
      this.energy -= amountOfEnergy;
      return amountOfEnergy;
    } else {
      const returnedEnergy = this.energy;
      this.energy = 0;
      return returnedEnergy;
    }
  }
}

interface OilReservoir {
  reservoir: {
    well: {
      amount: number;
    }
  }
}

class OilProvider extends EnergyProvider {
  public type = 'Oil Reservoir';

  constructor (reservoir: OilReservoir) {
    super(reservoir.reservoir.well.amount);
  }
}

interface AlternativeEnergySource {
  [key: string]: {
    amount: number;
  }
}

class AlternativeEnergyProvider extends EnergyProvider {
  public type = 'Alternative Energy';

  constructor (alternativeEnergySource: AlternativeEnergySource) {
    super(alternativeEnergySource[Object.keys(alternativeEnergySource)[0]].amount);
  }
}

class EnergyConsumer {
  private provider: EnergyProvider;
  private energy: number = 0;

  constructor (energyProvider: EnergyProvider) {
    this.provider = energyProvider;
  }

  public consumeEnergy = (toBeConsumed: number): boolean => {
    const energyAvailableFromProvider: number = this.provider.provideEnergy(toBeConsumed);
    this.energy += energyAvailableFromProvider;

    if (toBeConsumed <= this.energy) {
      this.energy -= toBeConsumed;
      return true;
    }

    return false;
  };
}

class Elevator {
  private floor: number = 1;
  private consumer: EnergyConsumer;

  constructor (energyConsumer: EnergyConsumer) {
    this.consumer = energyConsumer;
  }

  public move = (aFloor: number) => {
    if (this.consumer.consumeEnergy(Math.abs(this.floor - aFloor))) {
      this.floor = aFloor;
      console.log(`Moved elevator to floor: ${aFloor}`);
    } else {
      console.log(`Could not move to floor: ${aFloor}`);
    }
  }
}

const ourEnergyProvider = new OilProvider({
  reservoir: {
    well: {
      amount: 100,
    }
  }
});
//   new AlternativeEnergyProvider({
//   solar: {
//     amount: 20,
//   }
// });
const elevatorEnergyConsumer = new EnergyConsumer(ourEnergyProvider);
const firstElevator = new Elevator(elevatorEnergyConsumer);
firstElevator.move(6);
firstElevator.move(9);
firstElevator.move(21);

// We want to move to alternative energy, can you make the system work for that?
