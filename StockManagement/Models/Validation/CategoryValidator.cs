using FluentValidation;

namespace StockManagement.Models.Validation
{
    public class CategoryValidator : AbstractValidator<Category>
    {

        public CategoryValidator(ValidateFor mode)
        {
            this.RuleFor(x => x.Name).NotEmpty();
            if (mode == ValidateFor.Create)
                this.RuleFor(x => x.Id).Length(0);
            else
                this.RuleFor(x => x.Id).NotEmpty();
        }
    }
}