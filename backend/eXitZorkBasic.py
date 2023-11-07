import sys
import textwrap

class AdventureGame:
    def __init__(self):
        self.locations = {
            "start": {
                "description": "You wake up in a dimly lit dungeon cell. Your head is pounding and your vision blurry. There's a rusty door and a small window.",
                "exits": {"door": "corridor"},
                "items": [],
                "actions": ["look window", "search room"],
            },
            "corridor": {
                "description": "A torch-lit corridor stretches out with doors lining either side. You hear distant echoes.",
                "exits": {"north": "armory", "south": "cellar", "cell": "start"},
                "items": ["torch"],
                "actions": ["listen"],
            },
            "armory": {
                "description": "The room is filled with racks of ancient weapons. A shield catches your eye.",
                "exits": {"corridor": "corridor"},
                "items": ["shield", "sword"],
                "actions": ["take sword", "take shield"],
            },
            "cellar": {
                "description": "A cold and damp cellar. You can see a chest in the corner.",
                "exits": {"corridor": "corridor"},
                "items": ["chest"],
                "actions": ["open chest"],
                "puzzle": {
                    "solved": False,
                    "question": "A riddle is inscribed on the chest: 'The more you take, the more you leave behind. What am I?'",
                    "answer": "footsteps",
                    "reward": "key"
                }
            }
        }
        self.current_location = "start"
        self.inventory = []

    def wrap_text(self, text):
        return textwrap.fill(text, width=70)

    def describe_location(self):
        location = self.locations[self.current_location]
        print("\n" + self.wrap_text(location["description"]))
        print("\nExits:", ", ".join(location["exits"].keys()))
        if location["items"]:
            print("You see here:", ", ".join(location["items"]))

    def change_location(self, direction):
        current_exits = self.locations[self.current_location]["exits"]
        if direction in current_exits:
            self.current_location = current_exits[direction]
            print("\nYou move to the " + direction + ".\n")
        else:
            print("\nYou can't go that way.\n")

    def perform_action(self, action):
        location = self.locations[self.current_location]
        if action in location["actions"]:
            if action == "look window":
                print("\nYou see the outside world, freedom is close, but out of reach.")
            elif action == "search room":
                found_item = "lockpick"
                self.inventory.append(found_item)
                print("\nYou found a:", found_item)
            elif action == "listen":
                print("\nYou hear a guard approaching, better move quickly.")
            elif action == "take sword" or action == "take shield":
                item = action.split(" ")[1]
                self.inventory.append(item)
                location["items"].remove(item)
                print(f"\nYou take the {item}.")
            elif action == "open chest":
                if location["puzzle"]["solved"]:
                    print("\nThe chest is already open.")
                else:
                    print("\n" + self.wrap_text(location["puzzle"]["question"]))
                    answer = input("Your answer: ").strip().lower()
                    if answer == location["puzzle"]["answer"]:
                        location["puzzle"]["solved"] = True
                        reward = location["puzzle"]["reward"]
                        self.inventory.append(reward)
                        print(f"\nCorrect! You find a {reward} inside.")
                    else:
                        print("\nThat's not right. The chest remains locked.")
        else:
            print("\nYou can't do that here.")

    def run(self):
        print("Welcome to the eXit-Zork Adventure Game!")
        print("Type 'help' for a list of commands.\n")
        while True:
            self.describe_location()
            command = input("\nWhat do you want to do? ").strip().lower()
            if command in ["quit", "exit"]:
                print("Thanks for playing!")
                break
            elif command == "help":
                print("\nCommands:")
                print("  - go [direction]")
                print("  - use [item]")
                print("  - inventory")
                print("  - look")
                print("  - [action]")
            elif command.startswith("go "):
                direction = command.split()[1]
                self.change_location(direction)
            elif command == "inventory":
                print("\nYou are carrying:", ", ".join(self.inventory) if self.inventory else "nothing")
            elif command == "look":
                self.describe_location()
            else:
                self.perform_action(command)

if __name__ == "__main__":
    game = AdventureGame()
    game.run()
