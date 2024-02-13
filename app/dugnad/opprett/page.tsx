import { getCategories } from "@/actions/category";
import OprettForm from "@/components/dugnad/opprett-form";

const OpprettDugnadPage = async () => {
  const categories = await getCategories();

  return <OprettForm categories={categories}></OprettForm>;
};

export default OpprettDugnadPage;
