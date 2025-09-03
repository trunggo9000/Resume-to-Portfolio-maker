#!/usr/bin/env python3
from datetime import datetime


def main() -> None:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"Hello from Python! The time is {now}.")


if __name__ == "__main__":
    main()


