import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function SelectInput() {
  return (
    <Select>
      <SelectTrigger className="border-1 dark:border-white border-dark">
        <SelectValue placeholder="Select company" />
      </SelectTrigger>
      <SelectContent>
        <input type="text" placeholder="Search..." className="w-full py-1 px-2 mb-4 border-1 rounded-sm focus:outline-none dark:border-white border-dark" />
        <SelectItem value="anglecopr">anglecorp</SelectItem>
      </SelectContent>
    </Select>
  );
}
