import { FormP } from "./common";

type Vector3DInputP = FormP<[number, number, number]>;

const Vector3DInput = (props: Vector3DInputP) => {
  const [x, y, z] = props.value;

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedValue = [...props.value]; 
      updatedValue[index] = parseFloat(event.target.value);
      props.onChange(updatedValue as [number, number, number]);
    };

  return (
    <div>
      <label>
        X:
        <input type="number" value={x} onChange={handleInputChange(0)} />
      </label>
      <label>
        Y:
        <input type="number" value={y} onChange={handleInputChange(1)} />
      </label>
      <label>
        Z:
        <input type="number" value={z} onChange={handleInputChange(2)} />
      </label>
    </div>
  );
};

export default Vector3DInput;
