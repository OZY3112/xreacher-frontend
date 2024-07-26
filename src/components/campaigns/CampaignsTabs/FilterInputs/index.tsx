import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Dialog, Overlay } from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// FOLLOWERS SELECTORS

export function MinFollowerSelect({ following, setFollowing }: any) {
  const handleChange = (value: string) => {
    // Update the first number of the following array
    setFollowing([Number(value), following[1]]);
  };

  return (
    <Select onValueChange={handleChange} defaultValue="250">
      <SelectTrigger
        defaultValue="250"
        className="w-[250px] !bg-card !text-white "
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="!bg-card !text-white ">
        <SelectItem value="0">0</SelectItem>
        <SelectItem value="100">100</SelectItem>
        <SelectItem value="250">250</SelectItem>
        <SelectItem value="500">500</SelectItem>
        <SelectItem value="750">750</SelectItem>
        <SelectItem value="1000">1000</SelectItem>
        <SelectItem value="2500">2500</SelectItem>
        <SelectItem value="5000">5000</SelectItem>
        <SelectItem value="10000">10000</SelectItem>
        <SelectItem value="20000">20000</SelectItem>
        <SelectItem value="50000">50000</SelectItem>
        <SelectItem value="100000">100000</SelectItem>
        <SelectItem value="300000">300000</SelectItem>
        <SelectItem value="500000">500000</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function MaxFollowerSelect({ following, setFollowing }: any) {
  const handleChange = (value: string) => {
    // Update the second number of the following array
    setFollowing([following[0], Number(value)]);
  };

  return (
    <Select onValueChange={handleChange} defaultValue="1000">
      <SelectTrigger
        defaultValue="1000"
        className="w-[250px] !bg-card !text-white "
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="!bg-card !text-white ">
        <SelectItem value="100">100</SelectItem>
        <SelectItem value="250">250</SelectItem>
        <SelectItem value="500">500</SelectItem>
        <SelectItem value="750">750</SelectItem>
        <SelectItem value="1000">1000</SelectItem>
        <SelectItem value="2500">2500</SelectItem>
        <SelectItem value="5000">5000</SelectItem>
        <SelectItem value="10000">10000</SelectItem>
        <SelectItem value="20000">20000</SelectItem>
        <SelectItem value="50000">50000</SelectItem>
        <SelectItem value="100000">100000</SelectItem>
        <SelectItem value="300000">300000</SelectItem>
        <SelectItem value="500000">500000</SelectItem>
      </SelectContent>
    </Select>
  );
}

// FOLLOWING SELECTORS

export function MinFollowingSelect({ following, setFollowing }: any) {
  const handleChange = (value: string) => {
    // Update the first number of the following array
    setFollowing([Number(value), following[1]]);
  };

  return (
    <Select onValueChange={handleChange} defaultValue="0">
      <SelectTrigger
        defaultValue="0"
        className="w-[200px] !bg-card !text-white "
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="!bg-card !text-white ">
        <SelectItem value="0">0</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="250">250</SelectItem>
        <SelectItem value="500">500</SelectItem>
        <SelectItem value="750">750</SelectItem>
        <SelectItem value="1000">1000</SelectItem>
        <SelectItem value="2500">2500</SelectItem>
        <SelectItem value="5000">5000</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function MaxFollowingSelect({ following, setFollowing }: any) {
  const handleChange = (value: string) => {
    // Update the second number of the following array
    setFollowing([following[0], Number(value)]);
  };

  return (
    <Select onValueChange={handleChange} defaultValue="1000">
      <SelectTrigger
        defaultValue="1000"
        className="w-[200px] !bg-card !text-white "
      >
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="!bg-card !text-white ">
        <SelectItem value="250">250</SelectItem>
        <SelectItem value="500">500</SelectItem>
        <SelectItem value="750">750</SelectItem>
        <SelectItem value="1000">1000</SelectItem>
        <SelectItem value="2500">2500</SelectItem>
        <SelectItem value="5000">5000</SelectItem>
      </SelectContent>
    </Select>
  );
}

// VERIFIED SELECTOR

export function VerifiedSelect({ setVerified }: any) {
  const handleChange = (value: string) => {
    setVerified(value);
  };
  return (
    <Select onValueChange={handleChange} defaultValue="any">
      <SelectTrigger
        defaultValue="1000"
        className="w-[200px] !bg-card !text-white "
      >
        <SelectValue placeholder="Select" defaultValue="any" />
      </SelectTrigger>
      <SelectContent className="!bg-card !text-white ">
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="verified">Verified</SelectItem>
      </SelectContent>
    </Select>
  );
}

// BIO INCLUDE

export function BioInput({
  setBioExclude,
  setBioInclude,
  bioExclude,
  bioInclude,
}: any) {
  const [inputWord, setInputWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // aesthetics Array
  interface BioAesthetic {
    word: string;
    included: boolean;
  }

  const [bioAesthetics, setBioAesthetics] = useState<BioAesthetic[]>([]);

  const handleInclude = () => {
    setBioInclude([...bioInclude, inputWord]);

    setBioAesthetics([
      ...bioAesthetics,
      {
        word: inputWord,
        included: true,
      },
    ]);

    setInputWord("");
    inputRef.current?.focus();
  };

  const handleExclude = () => {
    setBioExclude([...bioExclude, inputWord]);

    setBioAesthetics([
      ...bioAesthetics,
      {
        word: inputWord,
        included: false,
      },
    ]);

    setInputWord("");
    inputRef.current?.focus();
  };

  const handleBadgeClick = (word: string, included: boolean) => {
    // Remove from bioAesthetics
    const updatedBioAesthetics = bioAesthetics.filter(
      (aesthetic) => aesthetic.word !== word
    );
    setBioAesthetics(updatedBioAesthetics);

    // Remove from bioInclude or bioExclude based on the 'included' flag
    if (included) {
      const updatedBioInclude = bioInclude.filter(
        (includeWord: string) => includeWord !== word
      );
      setBioInclude(updatedBioInclude);
    } else {
      const updatedBioExclude = bioExclude.filter(
        (excludeWord: string) => excludeWord !== word
      );
      setBioExclude(updatedBioExclude);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputWord.trim() !== "") {
      handleInclude();
    } else if (event.key === "Backspace" && inputWord.trim() === "") {
      // Remove the most recent object from bioAesthetics
      const updatedBioAesthetics = bioAesthetics.slice(
        0,
        bioAesthetics.length - 1
      );
      setBioAesthetics(updatedBioAesthetics);

      // Update bioInclude and bioExclude based on the removed object's 'included' flag
      if (bioAesthetics.length > 0) {
        const { word, included } = bioAesthetics[bioAesthetics.length - 1];
        if (included) {
          const updatedBioInclude = bioInclude.filter(
            (includeWord: string) => includeWord !== word
          );
          setBioInclude(updatedBioInclude);
        } else {
          const updatedBioExclude = bioExclude.filter(
            (excludeWord: string) => excludeWord !== word
          );
          setBioExclude(updatedBioExclude);
        }
      }
    }
  };
  return (
    <div className="mt-8 flex w-full rounded-lg border border-[1px] border-[#6C48F7] bg-[#F6F6F80D] px-4">
      <div className="my-auto mr-5 flex gap-5">
        {bioAesthetics.map((aesthetic, index) => (
          <Badge
            onClick={() => handleBadgeClick(aesthetic.word, aesthetic.included)}
            key={index}
            className={cn("", {
              "bg-green-500": aesthetic.included,
              "bg-red-500": !aesthetic.included,
            })}
          >
            {aesthetic.word}
          </Badge>
        ))}
      </div>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter Bio Keywords "
          className=" w-60 border-none !outline-none "
          value={inputWord}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputWord(e.target.value)}
        />
        {inputWord && (
          <Dialog open={inputWord.length > 0}>
            <Overlay className="absolute right-3 top-0 mt-1 flex gap-2">
              <Button
                onClick={handleInclude}
                variant="ghost"
                className="h-8 w-8 rounded-full !p-1 text-green-500"
              >
                <Check size={16} strokeWidth={2.5} />
              </Button>
              <Button
                onClick={handleExclude}
                variant="ghost"
                className="h-8 w-8 rounded-full !p-1 text-red-500"
              >
                <X size={16} strokeWidth={2.5} />
              </Button>
            </Overlay>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export function LocationInput({
  locationExclude,
  setLocationExclude,
  locationInclude,
  setLocationInclude,
}: any) {
  const [inputWord, setInputWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // aesthetics Array
  interface BioAesthetic {
    word: string;
    included: boolean;
  }

  const [locationAesthetics, setLocationAesthetics] = useState<BioAesthetic[]>(
    []
  );

  const handleInclude = () => {
    setLocationInclude([...locationInclude, inputWord]);

    setLocationAesthetics([
      ...locationAesthetics,
      {
        word: inputWord,
        included: true,
      },
    ]);

    setInputWord("");
    inputRef.current?.focus();
  };

  const handleExclude = () => {
    setLocationExclude([...locationExclude, inputWord]);

    setLocationAesthetics([
      ...locationAesthetics,
      {
        word: inputWord,
        included: false,
      },
    ]);

    setInputWord("");
    inputRef.current?.focus();
  };
  // New handler for clicking on a Badge
  const handleBadgeClick = (word: string, included: boolean) => {
    // Remove from locationAesthetics
    const updatedLocationAesthetics = locationAesthetics.filter(
      (aesthetic) => aesthetic.word !== word
    );
    setLocationAesthetics(updatedLocationAesthetics);

    // Remove from locationInclude or locationExclude based on the 'included' flag
    if (included) {
      const updatedLocationInclude = locationInclude.filter(
        (includeWord: string) => includeWord !== word
      );
      setLocationInclude(updatedLocationInclude);
    } else {
      const updatedLocationExclude = locationExclude.filter(
        (excludeWord: string) => excludeWord !== word
      );
      setLocationExclude(updatedLocationExclude);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputWord.trim() !== "") {
      handleInclude();
    } else if (event.key === "Backspace" && inputWord.trim() === "") {
      // Remove the most recent object from locationAesthetics
      const updatedLocationAesthetics = locationAesthetics.slice(
        0,
        locationAesthetics.length - 1
      );
      setLocationAesthetics(updatedLocationAesthetics);

      // Update locationInclude and locationExclude based on the removed object's 'included' flag
      if (locationAesthetics.length > 0) {
        const { word, included } =
          locationAesthetics[locationAesthetics.length - 1];
        if (included) {
          const updatedLocationInclude = locationInclude.filter(
            (includeWord: string) => includeWord !== word
          );
          setLocationInclude(updatedLocationInclude);
        } else {
          const updatedLocationExclude = locationExclude.filter(
            (excludeWord: string) => excludeWord !== word
          );
          setLocationExclude(updatedLocationExclude);
        }
      }
    }
  };
  return (
    <div className="mt-8 flex w-full rounded-lg border border-[1px] border-[#6C48F7] bg-[#F6F6F80D] px-4">
      <div className="my-auto mr-5 flex gap-5">
        {locationAesthetics.map((aesthetic, index) => (
          <Badge
            onClick={() => handleBadgeClick(aesthetic.word, aesthetic.included)}
            key={index}
            className={cn("", {
              "bg-green-500": aesthetic.included,
              "bg-red-500": !aesthetic.included,
            })}
          >
            {aesthetic.word}
          </Badge>
        ))}
      </div>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter Location"
          className=" w-60 border-none !outline-none "
          value={inputWord}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputWord(e.target.value)}
        />
        {inputWord && (
          <Dialog open={inputWord.length > 0}>
            <Overlay className="absolute right-3 top-0 mt-1 flex gap-2">
              <Button
                onClick={handleInclude}
                variant="ghost"
                className="h-8 w-8 rounded-full !p-1 text-green-500"
              >
                <Check size={16} strokeWidth={2.5} />
              </Button>
              <Button
                onClick={handleExclude}
                variant="ghost"
                className="h-8 w-8 rounded-full !p-1 text-red-500"
              >
                <X size={16} strokeWidth={2.5} />
              </Button>
            </Overlay>
          </Dialog>
        )}
      </div>
    </div>
  );
}
